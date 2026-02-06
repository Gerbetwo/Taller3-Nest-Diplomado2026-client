import { http } from "./http";
export type Departments = {
    id: number;
    fullName: string;
    email: string;
    phone?: string | null;
    createdAt?: string;
};
export type CreateDepartmentsDto = {
    fullName: string;
    email: string;
    phone?: string;
};
export type UpdateDepartmentsDto = Partial<CreateDepartmentsDto>;
export const departmentsApi = {
    list: () => http<Departments[]>("/departments"),
    create: (dto: CreateDepartmentsDto) =>
        http<Departments>("/departments", { method: "POST", body: JSON.stringify(dto) }),
    update: (id: number, dto: UpdateDepartmentsDto) =>
        http<Departments>(`/departments/${id}`, {
            method: "PATCH", body: JSON.stringify(dto)
        }),
    remove: (id: number) => http<void>(`/departments/${id}`, { method: "DELETE" }),
};