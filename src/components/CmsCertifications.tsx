"use client";

import React, { useState } from "react";
import { Certification } from "@/types";
import {
    Plus,
    Award,
    Trash2,
    CheckCircle2,
    ChevronRight,
    X,
    AlertCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface CmsCertificationsProps {
    certifications: Certification[];
    onSaveCertifications: (certs: Certification[]) => void;
}

export default function CmsCertifications({
    certifications,
    onSaveCertifications,
}: CmsCertificationsProps) {
    const [showAddForm, setShowAddForm] = useState(false);
    const [newTitle, setNewTitle] = useState("");
    const [newIssuer, setNewIssuer] = useState("");
    const [newIssueDate, setNewIssueDate] = useState("");

    const handleAddCert = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTitle || !newIssuer || !newIssueDate) return;

        const newCert: Certification = {
            id: `cert-${Date.now()}`,
            title: newTitle,
            issuer: newIssuer,
            issueDate: newIssueDate,
        };

        onSaveCertifications([...certifications, newCert]);

        // Reset Form
        setNewTitle("");
        setNewIssuer("");
        setNewIssueDate("");
        setShowAddForm(false);
    };

    const handleDeleteCert = (id: string, title: string) => {
        if (window.confirm(`Delete certification entry for "${title}"?`)) {
            onSaveCertifications(certifications.filter((c) => c.id !== id));
        }
    };

    return (
        <div className="flex-1 flex flex-col h-full overflow-hidden bg-background relative font-sans text-left">
            <div className="absolute top-0 right-0 w-full h-64 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-neutral-200/20 via-transparent to-transparent pointer-events-none"></div>

            <header className="mb-8 w-full px-6 md:px-10 pt-6 border-b border-outline-variant/15 pb-4 h-20 shrink-0 sticky top-0 bg-background/90 backdrop-blur-md flex items-center justify-between z-10">
                <div>
                    <h2 className="font-display text-2xl font-bold text-primary tracking-tight">
                        Credentials Portfolio
                    </h2>
                    <p className="font-sans text-xs text-on-surface-variant">
                        Manage professional engineering certifications, awards,
                        and licenses displayed publicly.
                    </p>
                </div>
                <button
                    onClick={() => setShowAddForm(!showAddForm)}
                    className="bg-primary text-white hover:bg-neutral-800 px-4 py-2 rounded-lg font-mono text-xs uppercase font-semibold flex items-center gap-2 cursor-pointer shrink-0"
                >
                    <Plus className="w-4 h-4 text-secondary-container" />
                    Add Certification
                </button>
            </header>

            <div className="flex-1 overflow-y-auto p-6 md:p-10 z-10 pb-24 max-w-5xl mx-auto w-full">
                {/* Certification Creator Form Box */}
                <AnimatePresence>
                    {showAddForm && (
                        <motion.form
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            onSubmit={handleAddCert}
                            className="bg-white rounded-xl border border-outline-variant/35 shadow-ambient-sm p-6 mb-6 relative text-left"
                        >
                            <button
                                type="button"
                                onClick={() => setShowAddForm(false)}
                                className="absolute top-4 right-4 text-outline hover:text-error cursor-pointer"
                            >
                                <X className="w-4 h-4" />
                            </button>

                            <h3 className="font-display font-bold text-sm text-primary mb-4 flex items-center gap-2">
                                <Award className="w-5 h-5 text-secondary" />
                                Register New Certification Credentials
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                                <div className="flex flex-col gap-1.5">
                                    <label className="font-mono text-[10px] uppercase font-semibold text-on-surface-variant tracking-wider">
                                        Title / Name *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="e.g. Google Certified Architect"
                                        className="bg-neutral-50 border border-outline-variant/35 rounded-lg px-3 py-2 text-xs font-medium focus:outline-none"
                                        value={newTitle}
                                        onChange={(e) =>
                                            setNewTitle(e.target.value)
                                        }
                                    />
                                </div>

                                <div className="flex flex-col gap-1.5">
                                    <label className="font-mono text-[10px] uppercase font-semibold text-on-surface-variant tracking-wider">
                                        Issuer Corp *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="e.g. Google Cloud"
                                        className="bg-neutral-50 border border-outline-variant/35 rounded-lg px-3 py-2 text-xs font-medium focus:outline-none"
                                        value={newIssuer}
                                        onChange={(e) =>
                                            setNewIssuer(e.target.value)
                                        }
                                    />
                                </div>

                                <div className="flex flex-col gap-1.5">
                                    <label className="font-mono text-[10px] uppercase font-semibold text-on-surface-variant tracking-wider">
                                        Year Issued *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="e.g. 2026"
                                        className="bg-neutral-50 border border-outline-variant/35 rounded-lg px-3 py-2 text-xs font-medium focus:outline-none"
                                        value={newIssueDate}
                                        onChange={(e) =>
                                            setNewIssueDate(e.target.value)
                                        }
                                    />
                                </div>
                            </div>

                            <div className="mt-4 flex justify-end gap-2 text-xs">
                                <button
                                    type="submit"
                                    className="bg-primary text-white font-mono text-xs uppercase font-semibold py-2 px-5 rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer"
                                >
                                    Confirm Registration
                                </button>
                            </div>
                        </motion.form>
                    )}
                </AnimatePresence>

                {/* Existing Grid list */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {certifications.map((cert) => (
                        <div
                            key={cert.id}
                            className="bg-white p-5 rounded-xl border border-outline-variant/20 shadow-ambient-sm flex justify-between items-center group hover:border-secondary transition-colors"
                        >
                            <div className="flex items-center gap-3.5 text-left min-w-0">
                                <div className="p-2.5 rounded-lg bg-neutral-100 text-secondary border border-outline-variant/10 shrink-0">
                                    <Award className="w-5 h-5 text-secondary" />
                                </div>
                                <div className="min-w-0">
                                    <h4 className="font-sans font-bold text-primary truncate leading-tight text-sm">
                                        {cert.title}
                                    </h4>
                                    <p className="text-xs text-on-surface-variant mt-0.5 truncate">
                                        {cert.issuer} &bull;{" "}
                                        <span className="font-mono text-[10px] font-bold text-secondary uppercase bg-secondary/5 px-2.5 py-0.5 rounded ml-1 border border-secondary/10">
                                            Issued {cert.issueDate}
                                        </span>
                                    </p>
                                </div>
                            </div>

                            <button
                                onClick={() =>
                                    handleDeleteCert(cert.id, cert.title)
                                }
                                className="text-neutral-400 hover:text-error shrink-0 p-2 cursor-pointer hover:bg-error-container rounded-lg"
                                title="Delete credential"
                            >
                                <Trash2 className="w-4 h-4 text-red-600" />
                            </button>
                        </div>
                    ))}

                    {certifications.length === 0 && (
                        <div className="col-span-full py-12 bg-white rounded-xl border border-outline-variant/20 text-center text-on-surface-variant space-y-2">
                            <AlertCircle className="w-8 h-8 text-neutral-400 mx-auto" />
                            <p className="font-semibold text-sm">
                                No certifications found.
                            </p>
                            <p className="text-xs">
                                Click "Add Certification" at the top to register
                                qualifications.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
