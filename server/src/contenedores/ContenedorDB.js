import mongoose from 'mongoose';
import * as dotenv from "dotenv";
import { logger } from '../config/winstonConfig.js';


const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

dotenv.config();

await mongoose.connect(process.env.MONGO_URL, options);


export default class ContenedorDB{

    constructor(collectionName, schema){
        this.model = mongoose.model(collectionName, schema)
    }

    async getById(id) {
        try {
          const item = await this.model.findOne({ _id: id });
          return item;
        } catch (error) {
          logger.error(`Error en getById(): ${error}`);
        }
      }
    
      async getAll() {
        try {
          const data = await this.model.find({});
          return data;
        } catch (error) {
          logger.error(`Error en getAll(): ${error}`);
        }
      }
    
      async save(itemData) {
        try {
          const data = await this.model.create(itemData);
          return data;
        } catch (error) {
          logger.error(`Error en save(): ${error}`);
        }
      }
    
      async updateById(id, itemData) {
        try {
          
          await this.model.updateOne({ _id: id }, { $set: { ...itemData } });
          const data = this.getById(id);
          return data;
        } catch (error) {
          logger.error(`Error en updateById(): ${error}`);
        }
      }
    
      async deleteById(id) {
        try {
          const data = await this.model.deleteOne({ _id: id });
          return data;
        } catch (error) {
          logger.error(`Error en deleteById(): ${error}`);
        }
      }
      async getByField(field, criteria) {
        try {
          const data = await this.model.findOne().where(field).equals(criteria);
         return data;
        } catch (error) {
          logger.error(`Error en getByField(): ${error}`);
        }
      }
      async getByFieldMany(field, criteria) {
        try {
          const data = await this.model.find().where(field).equals(criteria);
         return data;
        } catch (error) {
          logger.error(`Error en getByFieldMany(): ${error}`);
        }
      }
      async deleteAll() {
        try {
          await this.model.deleteMany({});
        } catch (error) {
          logger.error(`Error en deleteAll(): ${error}`);
        }
      }

    

}
