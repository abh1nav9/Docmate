import Hospital from "../models/Hospital.js";

export class HospitalSeeder {
    constructor(logger = console) {
        this.logger = logger;
    }

    async seed(hospitalData = []) {
        const hospitalMap = new Map();
        for (const hospital of hospitalData) {
            const { key, ...rest } = hospital;
            const existing = await Hospital.findOne({
                hospitalName: rest.hospitalName,
            }).exec();

            if (existing) {
                hospitalMap.set(key, existing);
                continue;
            }

            const createdHospital = await Hospital.create(rest);
            hospitalMap.set(key, createdHospital);
            this.logger.log(`Inserted hospital: ${rest.hospitalName}`);
        }
        return hospitalMap;
    }
}

