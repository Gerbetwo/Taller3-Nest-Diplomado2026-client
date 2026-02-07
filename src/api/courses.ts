import { http } from "./http";
export type DepartmentRef = {
    id: number;
    name: string;
};
export type Course = {
    id: number;
    code: string;
    title: string;
    departamentId: number;
};
export type CreateCourseDto = {
    code: string;
    title: string;
    departamentId: number;
};
export type UpdateCourseDto = Partial<CreateCourseDto>;
export const coursesApi = {
    list: () => http<Course[]>("/courses"),
    create: (dto: CreateCourseDto) =>
        http<Course>("/courses", {
            method: "POST",
            body: JSON.stringify(dto),
        }),
    update: (id: number, dto: UpdateCourseDto) =>
        http<Course>(`/courses/${id}`, {
            method: "PATCH",
            body: JSON.stringify(dto),
        }),
    remove: (id: number) =>
        http<void>(`/courses/${id}`, {
            method: "DELETE",
        }),
};