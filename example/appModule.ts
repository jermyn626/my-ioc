import { injectable } from '../src/decorators/injectable';
import { module } from '../src/decorators/module';

class AppService {
  constructor() {
    console.log('new AppService');
  }
}

@injectable
class AppController {
  constructor(private readonly appService: AppService) {
    console.log('new AppController', this.appService);
  }
}

@module({
  controller: AppController,
  service: AppService
})
export class AppModule {}
