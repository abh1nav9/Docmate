import Doctor from "../models/Doctor.js";
import { hashPassword } from "../utils/hashPassword.js";

export class DoctorSeeder {
    constructor(defaultPassword = "Docmate@123", logger = console) {
        this.defaultPassword = defaultPassword;
        this.logger = logger;
    }

    async seed(doctorData = [], hospitalMap = new Map()) {
        for (const doctor of doctorData) {
            const { hospitalKey, ...doctorFields } = doctor;
            const hospital = hospitalMap.get(hospitalKey);
            if (!hospital) {
                this.logger.warn(`Skipping ${doctorFields.name}; hospital missing`);
                continue;
            }

            const existing = await Doctor.findOne({ email: doctorFields.email }).exec();
            if (existing) {
                continue;
            }

            const password = await hashPassword(this.defaultPassword);
            await Doctor.create({
                ...doctorFields,
                password,
                hospital: hospital._id,
            });
            this.logger.log(`Inserted doctor: ${doctorFields.name}`);
        }
    }
}

