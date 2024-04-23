import { Injectable } from '@nestjs/common';
import { CreateAlertDto } from './dto/create-alert.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Alert } from './schema/alert.schema';

@Injectable()
export class AlertService {
  constructor(@InjectModel(Alert.name) private alertModel: Model<Alert>) {}
  create(createAlertDto: CreateAlertDto) {
    const newAlert = new this.alertModel(createAlertDto);
    return newAlert.save();
  }

  public findAll() {
    return this.alertModel.find().exec();
  }

  public findOne(id: string) {
    return this.alertModel.findOne({ _id: id }).exec();
  }

  public remove(id: string) {
    return this.alertModel.findOneAndDelete({ _id: id }).exec();
  }
}
