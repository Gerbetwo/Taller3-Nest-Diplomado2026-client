import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { coursesApi, type CreateCourseDto, type UpdateCourseDto } from "./courses";
const keys = {
    all: ["courses"] as const,
};
export function useCourses() {
    return useQuery({
        queryKey: keys.all,
        queryFn: coursesApi.list,
    });
}
export function useCreateCourse() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (dto: CreateCourseDto) => coursesApi.create(dto),
        onSuccess: () => qc.invalidateQueries({ queryKey: keys.all }),
    });
}
export function useUpdateCourse() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: ({ id, dto }: { id: number; dto: UpdateCourseDto }) =>
            coursesApi.update(id, dto),
        onSuccess: () => qc.invalidateQueries({ queryKey: keys.all }),
    });
}
export function useDeleteCourse() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => coursesApi.remove(id),
        onSuccess: () => qc.invalidateQueries({ queryKey: keys.all }),
    });
}