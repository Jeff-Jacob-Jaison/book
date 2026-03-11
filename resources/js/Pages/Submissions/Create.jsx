import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

export default function Create({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        author: '',
        isbn: '',
        published_year: '',
        price: '5.00',
        description: '',
        cover_image: null,
        book_file: null,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('submissions.store'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight font-serif">Upload E-Book</h2>}
        >
            <Head title="Sell E-Book - BookVault" />

            <div className="py-12 bg-[#f0f2f5] min-h-screen">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">

                    <div className="mb-4">
                        <Link href={route('submissions.index')} className="text-[#0c4a30] hover:underline font-semibold text-sm inline-flex items-center">
                            &larr; Back to My Portal
                        </Link>
                    </div>

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-2xl border border-slate-100 p-8">
                        <div className="mb-6 pb-6 border-b border-gray-100 text-center">
                            <h3 className="font-serif text-2xl font-bold text-gray-900">Upload to Virtual Bookshelf</h3>
                            <p className="text-slate-500 text-sm mt-2">Set your own price. Earn 20% passive commission for every digital rental sold.</p>
                        </div>

                        <form onSubmit={submit} className="space-y-6">
                            <div>
                                <InputLabel htmlFor="title" value="E-Book Title" />
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

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <InputLabel htmlFor="author" value="Author Name" />
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
                                <div>
                                    <InputLabel htmlFor="price" value="Selling Price ($)" />
                                    <TextInput
                                        id="price"
                                        type="number"
                                        name="price"
                                        step="0.01"
                                        min="0"
                                        value={data.price}
                                        className="mt-1 block w-full font-mono text-emerald-800"
                                        onChange={(e) => setData('price', e.target.value)}
                                    />
                                    <InputError message={errors.price} className="mt-2" />
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
                                    <InputLabel htmlFor="isbn" value="ISBN (Generated or Custom)" />
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

                            <div>
                                <InputLabel htmlFor="cover_image" value="E-Book Cover Art" />
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
                                <InputLabel htmlFor="book_file" value="E-Book File (PDF only)" />
                                <input
                                    id="book_file"
                                    type="file"
                                    name="book_file"
                                    accept=".pdf"
                                    onChange={(e) => setData('book_file', e.target.files[0])}
                                    className="mt-1 block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-colors"
                                />
                                <InputError message={errors.book_file} className="mt-2" />
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

                            <div className="flex items-center justify-end mt-4 pt-4 border-t border-gray-100">
                                <PrimaryButton className="ml-4 bg-[#0c4a30] hover:bg-emerald-800" disabled={processing}>
                                    Submit for Review
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
