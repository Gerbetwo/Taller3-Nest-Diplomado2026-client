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
    list: () => http<Departments[]>("/departaments"),
    create: (dto: CreateDepartmentsDto) =>
        http<Departments>("/departaments", { method: "POST", body: JSON.stringify(dto) }),
    update: (id: number, dto: UpdateDepartmentsDto) =>
        http<Departments>(`/departaments/${id}`, {
            method: "PATCH", body: JSON.stringify(dto)
        }),
    remove: (id: number) => http<void>(`/departaments/${id}`, { method: "DELETE" }),
};