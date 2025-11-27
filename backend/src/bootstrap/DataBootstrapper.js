import Hospital from "../models/Hospital.js";
import { DatabaseSeeder } from "../seed/DatabaseSeeder.js";

export class DataBootstrapper {
    constructor(
        {
            hospitalModel = Hospital,
            seeder = new DatabaseSeeder({ manageConnection: false }),
            logger = console,
        } = {}
    ) {
        this.hospitalModel = hospitalModel;
        this.seeder = seeder;
        this.logger = logger;
    }

    async ensureSeedData() {
        const hospitalCount = await this.hospitalModel.countDocuments().exec();
        if (hospitalCount > 0) {
            this.logger.log("Seed data already present. Skipping bootstrap seeding.");
            return;
        }

        this.logger.log("No hospitals found. Running bootstrap seeding.");
        await this.seeder.seed();
    }
}

