import { useState } from "react";
import { useCreateCustomer, useCustomers, useDeleteCustomer } from "../api/customers.queries";
export default function CustomersPage() {
    const { data = [], isLoading, isError, error, refetch } = useCustomers();
    const createMut = useCreateCustomer();
    const deleteMut = useDeleteCustomer();
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    async function onCreate(e: React.FormEvent) {
        e.preventDefault();
        await createMut.mutateAsync({ fullName, email });
        setFullName("");
        setEmail("");
    }
    return (
        <div className="justify-center bg-slate-950 text-slate-200 antialiased">
            <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-10">
                <div className="mx-auto max-w-5xl px-4 py-4 flex items-center justify-between">
                    <h1 className="text-xl font-bold tracking-tight text-white">Customers</h1>
                    <button
                        className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-sm font-medium hover:bg-slate-700 hover:text-white transition-colors"
                        onClick={() => refetch()}
                    >
                        🔄 Refrescar
                    </button>
                </div>
            </header>

            <main className="mx-auto max-w-5xl px-4 py-8 space-y-8">
                {/* Formulario de Creación */}
                <form onSubmit={onCreate} className="rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-xl space-y-4">
                    <div className="border-b border-slate-800 pb-2">
                        <h2 className="text-sm font-semibold text-indigo-400 uppercase tracking-wider">Nuevo Cliente</h2>
                        <p className="text-xs text-slate-500 mt-1">Crea un registro y actualiza la caché automáticamente.</p>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        <div>
                            <label className="block text-xs font-medium text-slate-400 mb-1.5 ml-1">Nombre Completo</label>
                            <input
                                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all placeholder:text-slate-600"
                                placeholder="Ej. Juan Pérez"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-slate-400 mb-1.5 ml-1">Email Corporativo</label>
                            <input
                                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all placeholder:text-slate-600"
                                type="email"
                                placeholder="juan@empresa.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                        <button
                            className="rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500 active:scale-95 disabled:opacity-50 disabled:active:scale-100 transition-all shadow-lg shadow-indigo-500/20"
                            disabled={createMut.isPending}
                        >
                            {createMut.isPending ? "Procesando..." : "Crear Usuario"}
                        </button>
                        {createMut.isError && (
                            <span className="text-xs font-medium text-red-400 bg-red-400/10 px-3 py-1 rounded-full">
                                ⚠️ Error: {String(createMut.error)}
                            </span>
                        )}
                    </div>
                </form>

                {/* Tabla de Resultados */}
                <div className="rounded-xl border border-slate-800 bg-slate-900 shadow-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-800 flex justify-between items-center bg-slate-800/30">
                        <h3 className="font-medium text-slate-300">Listado de Clientes</h3>
                        {isLoading ? (
                            <span className="text-xs text-indigo-400 animate-pulse">Cargando datos...</span>
                        ) : (
                            <span className="text-xs font-medium bg-slate-800 px-2.5 py-1 rounded-md text-slate-400 border border-slate-700">
                                {data?.length || 0} registro(s)
                            </span>
                        )}
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-950/50 text-slate-400 text-xs uppercase tracking-widest">
                                <tr>
                                    <th className="px-6 py-4 font-semibold">Nombre</th>
                                    <th className="px-6 py-4 font-semibold">Email</th>
                                    <th className="px-6 py-4 font-semibold text-center w-32">Acción</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800">
                                {data?.map((c) => (
                                    <tr key={c.id} className="group hover:bg-slate-800/40 transition-colors">
                                        <td className="px-6 py-4 text-sm font-medium text-white">{c.fullName}</td>
                                        <td className="px-6 py-4 text-sm text-slate-400">{c.email}</td>
                                        <td className="px-6 py-4 text-center">
                                            <button
                                                className="text-xs font-bold text-red-400 hover:text-red-300 hover:bg-red-400/10 px-3 py-1.5 rounded-md transition-all disabled:opacity-30"
                                                disabled={deleteMut.isPending}
                                                onClick={() => {
                                                    if (!confirm("¿Seguro que deseas borrar este customer?")) return;
                                                    deleteMut.mutate(c.id);
                                                }}
                                            >
                                                ELIMINAR
                                            </button>
                                        </td>
                                    </tr>
                                ))}

                                {!isLoading && data?.length === 0 && (
                                    <tr>
                                        <td className="p-12 text-center text-slate-500" colSpan={3}>
                                            <div className="flex flex-col items-center gap-2">
                                                <span className="text-3xl">📁</span>
                                                <p>No se encontraron registros en la base de datos.</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {isError && (
                        <div className="p-4 bg-red-900/20 border-t border-red-900/50">
                            <p className="text-sm text-red-400 text-center">Error al cargar datos: {String(error)}</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}