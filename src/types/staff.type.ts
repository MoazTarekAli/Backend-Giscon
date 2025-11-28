export interface Staff {
    staff_id: number,
    staff_name: string,
    title: string,
    email: string,
    phone: string,
    summary: string
}

export interface CreateStaffInput {
    staff_name: string,
    title?: string,
    email: string,
    phone: string,
    summary?: string
}

export interface UpdateStaffInput {
    staff_name?: string,
    title?: string,
    email?: string,
    phone?: string,
    summary?: string
}

export interface StaffResponse {
    staff_id: number,
    staff_name: string,
    title?: string,
    email: string,
    phone: string,
    summary?: string
}