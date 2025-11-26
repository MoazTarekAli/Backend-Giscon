export class StaffModel {
  staff_id: number;
  email: string;
  staff_name: string;
  title: string;
  phone: string;
  summary: string;

  constructor(data: any) {
    this.staff_id = data.staff_id;
    this.email = data.email;
    this.staff_name = data.staff_name;
    this.title = data.title;
    this.phone = data.phone;
    this.summary = data.summary;
  }

  toJSON() {
    return {
      staff_id: this.staff_id,
      email: this.email,
      staff_name: this.staff_name,
      title: this.title,
      phone: this.phone,
      summary: this.summary
    };
  }
}