import {Request, Response} from 'express'

import orphangeView from '../views/orphanageView'

import {getRepository} from 'typeorm';
import Orphanage from '../models/Orphanage';

import * as Yup from 'yup'

export default {

    async index(request:Request , response:Response){

        
        const orphanagesRepository = getRepository(Orphanage)

        const orphanages = await orphanagesRepository.find({
                relations: ['images']
        });

        return response.json(orphangeView.renderMany(orphanages));
    },

    async show(request:Request , response:Response){

        const {id} = request.params

        const orphanagesRepository = getRepository(Orphanage)

        const orphanage = await orphanagesRepository.findOneOrFail(id,{
            relations: ['images']
        });

        return response.json(orphangeView.render(orphanage));
    },
    
    async create (request:Request , response:Response ){
        const {
            name, 
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekend,
        } = request.body
    
        const orphanagesRepository = getRepository(Orphanage)

        const requestImages = request.files as Express.Multer.File[]
        const images = requestImages.map(image =>{
            return { path: image.filename}
        })

        const data = {
            name, 
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekend: open_on_weekend ==  "true" ,
            images
        }

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),
            about: Yup.string().required().max(300),
            instructions: Yup.string().required(),
            opening_hours: Yup.string().required(),
            open_on_weekend: Yup.boolean().required(),

            image: Yup.array(Yup.object().shape({
                path:Yup.string().required()
            }))
        });

               

        await schema.validate(data,{
            abortEarly: false,
        })
        const orphanage = orphanagesRepository.create(data);
    
        await orphanagesRepository.save(orphanage)
    
        return response.status(201).json(orphanage)
    }}