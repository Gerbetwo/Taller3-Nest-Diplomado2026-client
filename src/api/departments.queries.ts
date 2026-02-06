import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { departmentsApi, type CreateDepartmentsDto, type UpdateDepartmentsDto } from "./departments";
const keys = {
    all: ["departments"] as const,
};
export function usedepartments() {
    return useQuery({
        queryKey: keys.all,
        queryFn: departmentsApi.list,
    });
}
export function useCreateDeparments() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (dto: CreateDepartmentsDto) => departmentsApi.create(dto),
        onSuccess: () => qc.invalidateQueries({ queryKey: keys.all }),
    });
}
export function useUpdateDeparments() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: ({ id, dto }: { id: number; dto: UpdateDepartmentsDto }) =>
            departmentsApi.update(id, dto),
        onSuccess: () => qc.invalidateQueries({ queryKey: keys.all }),
    });
}
export function useDeleteDeparments() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => departmentsApi.remove(id),
        onSuccess: () => qc.invalidateQueries({ queryKey: keys.all }),
    });
}