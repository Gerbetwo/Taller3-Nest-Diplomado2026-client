import { useMemo, useState } from "react";
import {
    useCourses,
    useCreateCourse,
    useDeleteCourse,
    useUpdateCourse,
} from "../api/courses.queries";
import { useDepartments } from "../api/departments.queries"
type EditingState = {
    id: number;
    code: string;
    title: string;
    departmentId: number | "";
};
export default function CoursesPage() {
    const { data: courses = [], isLoading, isError, error } = useCourses();
    const { data: departments = [] } = useDepartments();
    const createMut = useCreateCourse();
    const updateMut = useUpdateCourse();
    const deleteMut = useDeleteCourse();
    const [code, setCode] = useState("");
    const [title, setTitle] = useState("");
    const [departmentId, setDepartmentId] = useState<number | "">("");
    const [editing, setEditing] = useState<EditingState | null>(null);
    const deptNameById = useMemo(() => {
        const map = new Map<number, string>();
        for (const d of departments as any[]) map.set(d.id, d.name);
        return map;
    }, [departments]);
    async function handleCreate(e: React.FormEvent) {
        e.preventDefault();
        // Validación mínima (además de required)
        if (!departmentId) return;
        await createMut.mutateAsync({
            code: code.trim(),
            title: title.trim(),
            departmentId: Number(departmentId),
        });
        setCode("");
        setTitle("");
        setDepartmentId("");
    }
    function startEdit(c: any) {
        setEditing({
            id: c.id,
            code: c.code,
            title: c.title,
            departmentId: c.departmentId,
        });
    }
    function cancelEdit() {
        setEditing(null);
    }
    async function saveEdit() {
        if (!editing) return;
        if (!editing.departmentId) return;
        await updateMut.mutateAsync({
            id: editing.id,
            dto: {
                code: editing.code.trim(),
                title: editing.title.trim(),
                departmentId: Number(editing.departmentId),
            },
        });
        setEditing(null);
    }
    return (
        <div className="p-6 max-w-5xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Courses</h1>
                <span className="text-sm text-slate-500">/courses</span>
            </div>
            <form onSubmit={handleCreate} className="rounded-xl border bg-slate-900 p-4 space-y-3">
                <h2 className="font-semibold">Create Course</h2>
                <div className="grid gap-3 md:grid-cols-3">
                    <div>
                        <label className="block text-sm font-medium mb-1">Code</label>
                        <input
                            className="w-full rounded-lg border px-3 py-2"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            placeholder="e.g., CS101"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Title</label>
                        <input
                            className="w-full rounded-lg border px-3 py-2"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="e.g., Introduction to Programming"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Department</label>
                        <select
                            className="w-full rounded-lg border px-3 py-2"
                            value={departmentId}
                            onChange={(e) => setDepartmentId(Number(e.target.value))}
                            required
                        >
                            <option value="">Select department</option>
                            {(departments as any[]).map((d) => (
                                <option key={d.id} value={d.id}>
                                    {d.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <button
                    className="rounded-lg bg-black px-4 py-2 text-white disabled:opacity-50"
                    disabled={createMut.isPending}
                >
                    {createMut.isPending ? "Creating..." : "Create"}
                </button>
                {createMut.isError && (
                    <p className="text-sm text-red-600">Create error: {String(createMut.error)}</p>
                )}
            </form>
            <div className="rounded-xl border bg-slate-900 overflow-hidden">
                <div className="p-4 border-b">
                    {isLoading && <p className="text-sm text-slate-600">Loading courses…</p>}
                    {isError && <p className="text-sm text-red-600">Error: {String(error)}</p>}
                    {!isLoading && !isError && (
                        <p className="text-sm text-slate-600">{courses.length} course(s)</p>
                    )}
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-slate-900 text-left">
                            <tr>
                                <th className="p-3">Code</th>
                                <th className="p-3">Title</th>
                                <th className="p-3">Department</th>
                                <th className="p-3 w-64">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(courses as any[]).map((c) => {
                                const isEditing = editing?.id === c.id;
                                const deptLabel =
                                    c.department?.name ??
                                    deptNameById.get(c.departmentId) ??
                                    `#${c.departmentId}`;
                                return (
                                    <tr key={c.id} className="border-t">
                                        <td className="p-3">
                                            {isEditing ? (
                                                <input
                                                    className="w-full rounded border px-2 py-1"
                                                    value={editing!.code}
                                                    onChange={(e) =>
                                                        setEditing((prev) =>
                                                            prev ? { ...prev, code: e.target.value } : prev
                                                        )
                                                    }
                                                />
                                            ) : (
                                                c.code
                                            )}
                                        </td>
                                        <td className="p-3">
                                            {isEditing ? (
                                                <input
                                                    className="w-full rounded border px-2 py-1"
                                                    value={editing!.title}
                                                    onChange={(e) =>
                                                        setEditing((prev) =>
                                                            prev ? { ...prev, title: e.target.value } : prev
                                                        )
                                                    }
                                                />
                                            ) : (
                                                c.title
                                            )}
                                        </td>
                                        <td className="p-3">
                                            {isEditing ? (
                                                <select
                                                    className="w-full rounded border px-2 py-1"
                                                    value={editing!.departmentId}
                                                    onChange={(e) =>
                                                        setEditing((prev) =>
                                                            prev
                                                                ? {
                                                                    ...prev, departmentId:
                                                                        Number(e.target.value)
                                                                }
                                                                : prev
                                                        )
                                                    }
                                                >
                                                    {(departments as any[]).map((d) => (
                                                        <option key={d.id} value={d.id}>
                                                            {d.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            ) : (
                                                deptLabel
                                            )}
                                        </td>
                                        <td className="p-3">
                                            <div className="flex gap-2">
                                                {isEditing ? (
                                                    <>
                                                        <button
                                                            className="rounded bg-black px-3 py-1 text-white disabled:opacity-50"
                                                            onClick={saveEdit}
                                                            disabled={updateMut.isPending}>
                                                            {updateMut.isPending ? "Saving…" : "Save"}
                                                        </button>
                                                        <button
                                                            className="rounded border px-3 py-1"
                                                            onClick={cancelEdit}>
                                                            Cancel
                                                        </button>
                                                    </>
                                                ) : (
                                                    <>
                                                        <button
                                                            className="rounded border px-3 py-1"
                                                            onClick={() => startEdit(c)}>
                                                            Edit
                                                        </button>
                                                        <button
                                                            className="rounded bg-red-600 px-3 py-1 text-white disabled:opacity-50"
                                                            onClick={() => {
                                                                if (!confirm("Delete this course?")) return;
                                                                deleteMut.mutate(c.id);
                                                            }}
                                                            disabled={deleteMut.isPending}>
                                                            Delete
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                            {!isLoading && !isError && courses.length === 0 && (
                                <tr>
                                    <td className="p-6 text-center text-slate-500" colSpan={4}>
                                        No courses found. Create the first one above.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                {(updateMut.isError || deleteMut.isError) && (
                    <div className="p-4 border-t">
                        {updateMut.isError && (
                            <p className="text-sm text-red-600">Update error: {String(updateMut.error)}</p>
                        )}
                        {deleteMut.isError && (
                            <p className="text-sm text-red-600">Delete error: {String(deleteMut.error)}</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}