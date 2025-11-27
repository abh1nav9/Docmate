import mongoose from "mongoose";
import { MONGODB_URI } from "../constants.js";
import { HospitalSeeder } from "./HospitalSeeder.js";
import { DoctorSeeder } from "./DoctorSeeder.js";
import { SeedDataProvider } from "./SeedDataProvider.js";

const mongooseOptions = {
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    family: 4,
};

export class DatabaseSeeder {
    constructor(
        {
            hospitalSeeder = new HospitalSeeder(),
            doctorSeeder = new DoctorSeeder(),
            dataProvider = new SeedDataProvider(),
            logger = console,
            manageConnection = true,
        } = {}
    ) {
        this.hospitalSeeder = hospitalSeeder;
        this.doctorSeeder = doctorSeeder;
        this.dataProvider = dataProvider;
        this.logger = logger;
        this.manageConnection = manageConnection;
    }

    async connect() {
        if (mongoose.connection.readyState !== 0) {
            return;
        }
        await mongoose.connect(MONGODB_URI, mongooseOptions);
        this.logger.log("MongoDB connection established for seeding");
    }

    async disconnect() {
        if (mongoose.connection.readyState === 0) {
            return;
        }
        await mongoose.connection.close();
        this.logger.log("MongoDB connection closed");
    }

    async seed() {
        try {
            if (this.manageConnection) {
                await this.connect();
            }
            await this.runSeedPipeline();
            this.logger.log("Seeding completed");
        } finally {
            if (this.manageConnection) {
                await this.disconnect();
            }
        }
    }

    async runSeedPipeline() {
        const hospitals = await this.hospitalSeeder.seed(
            this.dataProvider.getHospitalData()
        );
        await this.doctorSeeder.seed(
            this.dataProvider.getDoctorData(),
            hospitals
        );
    }
}

