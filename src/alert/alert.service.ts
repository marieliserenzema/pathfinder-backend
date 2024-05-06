import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlertDto } from './dto/create-alert.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Alert, LatLng } from './schema/alert.schema';

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

  public async findHikeAlerts(hikeId: string) {
    const alerts = await this.alertModel.find({ hikeId: hikeId }).exec();

    if (alerts.length <= 0) {
      throw new NotFoundException();
    }

    const finalAlerts: Alert[] = [];
    alerts.map((alert: Alert) => {
      let shouldPlace = true;
      for (const finalAlert of finalAlerts) {
        const dist = this.calculateDistanceBetween(
          alert.coordinate,
          finalAlert.coordinate,
        );

        if (dist < 0.0009009) {
          shouldPlace = false;
          break;
        }
      }

      if (shouldPlace) {
        finalAlerts.push(alert);
      }
    });
    return finalAlerts;
  }

  public remove(id: string) {
    return this.alertModel.findOneAndDelete({ _id: id }).exec();
  }

  public calculateDistanceBetween(coord1: LatLng, coord2: LatLng) {
    return Math.sqrt(
      Math.pow(coord2.longitude - coord1.longitude, 2) +
        Math.pow(coord2.latitude - coord1.latitude, 2),
    );
  }
}
