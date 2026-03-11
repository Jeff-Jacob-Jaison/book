import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import React, { useState, useRef, useEffect } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

export default function Create({ auth }) {
    const [isGenresOpen, setIsGenresOpen] = useState(false);
    const genresRef = useRef(null);

    const availableGenres = [
        "Fiction", "Non-Fiction", "Mystery/Thriller", "Sci-Fi",
        "Fantasy", "Biography", "History", "Children's", "Romance", "Other"
    ];

    const { data, setData, post, processing, errors } = useForm({
        title: '',
        type: 'Physical',
        genre: [],
        author: '',
        isbn: '',
        published_year: '',
        quantity: 1,
        description: '',
        cover_image: null,
    });

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (genresRef.current && !genresRef.current.contains(event.target)) {
                setIsGenresOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('books.store'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight font-serif">Add New Book</h2>}
        >
            <Head title="Add Book - BookVault" />

            <div className="py-12 bg-[#f0f2f5] min-h-screen">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">

                    <div className="mb-4">
                        <Link href={route('books.index')} className="text-[#0c4a30] hover:underline font-semibold text-sm inline-flex items-center">
                            &larr; Back to Inventory
                        </Link>
                    </div>

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-2xl border border-slate-100 p-8">
                        <form onSubmit={submit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <InputLabel htmlFor="title" value="Book Title" />
                                    <TextInput
                                        id="title"
                                        type="text"
                                        name="title"
                                        value={data.title}
                                        className="mt-1 block w-full"
                                        isFocused={true}
                                        onChange={(e) => setData('title', e.target.value)}
                                    />
                                    <InputError message={errors.title} className="mt-2" />
                                </div>
                                <div>
                                    <InputLabel htmlFor="type" value="Format" />
                                    <select
                                        id="type"
                                        name="type"
                                        value={data.type}
                                        className="mt-1 block w-full border-gray-300 focus:border-[#0c4a30] focus:ring-[#0c4a30] rounded-md shadow-sm"
                                        onChange={(e) => setData('type', e.target.value)}
                                    >
                                        <option value="Physical">Physical Book</option>
                                        <option value="E-Book">Digital E-Book</option>
                                    </select>
                                    <InputError message={errors.type} className="mt-2" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <InputLabel htmlFor="author" value="Author" />
                                    <TextInput
                                        id="author"
                                        type="text"
                                        name="author"
                                        value={data.author}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('author', e.target.value)}
                                    />
                                    <InputError message={errors.author} className="mt-2" />
                                </div>
                                <div className="relative" ref={genresRef}>
                                    <InputLabel htmlFor="genre" value="Genres" className="mb-1" />

                                    <button
                                        type="button"
                                        onClick={() => setIsGenresOpen(!isGenresOpen)}
                                        className="w-full bg-white border border-gray-300 text-slate-700 rounded-md px-4 py-2.5 outline-none focus:border-[#0c4a30] focus:ring-1 focus:ring-[#0c4a30] transition-all font-sans text-sm flex items-center justify-between shadow-sm"
                                    >
                                        <span className="truncate pr-4">
                                            {data.genre.length === 0 ? "Select Genres..." : data.genre.join(', ')}
                                        </span>
                                        <svg className={`w-4 h-4 text-gray-500 transition-transform duration-200 shrink-0 ${isGenresOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                    </button>

                                    {isGenresOpen && (
                                        <div className="absolute top-[100%] left-0 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-xl z-[60] py-2 max-h-60 overflow-y-auto">
                                            {availableGenres.map(genre => (
                                                <label key={genre} className="flex items-center gap-3 px-4 py-2.5 hover:bg-emerald-50 cursor-pointer transition-colors border-b border-gray-50 last:border-0">
                                                    <input
                                                        type="checkbox"
                                                        className="rounded border-gray-300 text-[#0c4a30] focus:ring-[#0c4a30] w-4 h-4 cursor-pointer"
                                                        checked={data.genre.includes(genre)}
                                                        onChange={() => {
                                                            const newGenres = data.genre.includes(genre)
                                                                ? data.genre.filter(g => g !== genre)
                                                                : [...data.genre, genre];
                                                            setData('genre', newGenres);
                                                        }}
                                                    />
                                                    <span className="text-sm font-sans font-medium text-slate-700 select-none">{genre}</span>
                                                </label>
                                            ))}
                                        </div>
                                    )}
                                    <InputError message={errors.genre} className="mt-2" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <InputLabel htmlFor="isbn" value="ISBN" />
                                    <TextInput
                                        id="isbn"
                                        type="text"
                                        name="isbn"
                                        value={data.isbn}
                                        className="mt-1 block w-full font-mono"
                                        onChange={(e) => setData('isbn', e.target.value)}
                                    />
                                    <InputError message={errors.isbn} className="mt-2" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <InputLabel htmlFor="published_year" value="Published Year" />
                                    <TextInput
                                        id="published_year"
                                        type="number"
                                        name="published_year"
                                        value={data.published_year}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('published_year', e.target.value)}
                                    />
                                    <InputError message={errors.published_year} className="mt-2" />
                                </div>
                                <div>
                                    <InputLabel htmlFor="quantity" value="Total Quantity Overview" />
                                    <TextInput
                                        id="quantity"
                                        type="number"
                                        name="quantity"
                                        value={data.quantity}
                                        className="mt-1 block w-full"
                                        min="1"
                                        onChange={(e) => setData('quantity', e.target.value)}
                                    />
                                    <InputError message={errors.quantity} className="mt-2" />
                                </div>
                            </div>

                            <div>
                                <InputLabel htmlFor="cover_image" value="Cover Image" />
                                <input
                                    id="cover_image"
                                    type="file"
                                    name="cover_image"
                                    onChange={(e) => setData('cover_image', e.target.files[0])}
                                    className="mt-1 block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 transition-colors"
                                />
                                <InputError message={errors.cover_image} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="description" value="Synopsis / Description" />
                                <textarea
                                    id="description"
                                    name="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 focus:border-[#0c4a30] focus:ring-[#0c4a30] rounded-md shadow-sm min-h-[120px]"
                                />
                                <InputError message={errors.description} className="mt-2" />
                            </div>

                            <div className="flex items-center justify-end mt-4">
                                <PrimaryButton className="ml-4 bg-[#0c4a30] hover:bg-emerald-800" disabled={processing}>
                                    Save Record
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
