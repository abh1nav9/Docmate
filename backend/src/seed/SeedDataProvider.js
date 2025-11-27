export class SeedDataProvider {
    constructor() {
        this.hospitals = [
            {
                key: "green_valley",
                hospitalName: "Green Valley Medical Center",
                hospitalAddress: "12 Residency Road, Bengaluru",
                lat: "12.9716",
                lng: "77.5946",
                pincode: "560001",
            },
            {
                key: "lakeside_specialty",
                hospitalName: "Lakeside Specialty Hospital",
                hospitalAddress: "220 MG Road, Bengaluru",
                lat: "12.9750",
                lng: "77.6050",
                pincode: "560025",
            },
            {
                key: "sunrise_clinic",
                hospitalName: "Sunrise Multispeciality Clinic",
                hospitalAddress: "88 Bannerghatta Main Road, Bengaluru",
                lat: "12.9141",
                lng: "77.6101",
                pincode: "560076",
            },
        ];

        this.doctors = [
            {
                name: "Dr. Aditi Sharma",
                email: "aditi.sharma@greenvalley.com",
                mobile_number: "+91-98800-11111",
                gender: "female",
                hospitalKey: "green_valley",
            },
            {
                name: "Dr. Vihaan Rao",
                email: "vihaan.rao@greenvalley.com",
                mobile_number: "+91-98800-22222",
                gender: "male",
                hospitalKey: "green_valley",
            },
            {
                name: "Dr. Meera Kapoor",
                email: "meera.kapoor@lakesidespecialty.com",
                mobile_number: "+91-98800-33333",
                gender: "female",
                hospitalKey: "lakeside_specialty",
            },
            {
                name: "Dr. Raghav Menon",
                email: "raghav.menon@sunriseclinic.com",
                mobile_number: "+91-98800-44444",
                gender: "male",
                hospitalKey: "sunrise_clinic",
            },
        ];
    }

    getHospitalData() {
        return this.hospitals;
    }

    getDoctorData() {
        return this.doctors;
    }
}

