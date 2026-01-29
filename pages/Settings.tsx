import React, {useEffect, useState} from 'react';
import {useUser} from "@/context/UserContext.tsx";
import {useCookies} from "react-cookie";
import {getApiUrl} from "@/config/api.ts";
import {z} from "zod";

interface Category {
    id: number;
    name: string;
    icon: string;
    color: string;
    type: 'INCOME' | 'EXPENSE';
}

const profilePictureSchema = z.object({
    profilePictureUrl: z.string().url("Please enter a valid URL").or(z.literal("")),
});

const passwordSchema = z.object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

const categorySchema = z.object({
    name: z.string().min(1, "Category name is required"),
    icon: z.string().min(1, "Icon is required"),
    color: z.string().regex(/^#[0-9A-F]{6}$/i, "Invalid color format"),
    type: z.enum(["INCOME", "EXPENSE"]),
});

const Settings: React.FC = () => {
    const {userProfile, refreshProfile} = useUser();
    const [cookies] = useCookies(['user']);

    const [profilePictureUrl, setProfilePictureUrl] = useState('');
    const [profileLoading, setProfileLoading] = useState(false);
    const [profileMessage, setProfileMessage] = useState<{success?: string, error?: string}>({});

    const [passwords, setPasswords] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });
    const [passwordLoading, setPasswordLoading] = useState(false);
    const [passwordMessage, setPasswordMessage] = useState<{success?: string, error?: string}>({});

    const [catName, setCatName] = useState('');
    const [catType, setCatType] = useState<'EXPENSE' | 'INCOME'>('EXPENSE');
    const [catColor, setCatColor] = useState('#3b82f6');
    const [catEmoji, setCatEmoji] = useState('🏠');
    const [categories, setCategories] = useState<Category[]>([]);
    const [categoryLoading, setCategoryLoading] = useState(false);
    const [categoryMessage, setCategoryMessage] = useState<{success?: string, error?: string}>({});

    const presetColors = ['#3b82f6', '#10b981', '#ef4444', '#a855f7', '#f97316', '#ec4899'];

    useEffect(() => {
        if (userProfile?.profilePictureUrl) {
            setProfilePictureUrl(userProfile.profilePictureUrl);
        }
    }, [userProfile]);

    useEffect(() => {
        if (cookies.user) {
            fetchCategories();
        }
    }, [cookies.user]);

    const fetchCategories = async () => {
        try {
            const response = await fetch(getApiUrl(`/categories`), {
                headers: {
                    'Authorization': `Bearer ${cookies.user}`,
                },
            });
            const data = await response.json();
            setCategories(data.data || []);
        } catch (err) {
            console.error('Error fetching categories:', err);
        }
    };

    const handleProfilePictureUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setProfileMessage({});

        try {
            profilePictureSchema.parse({ profilePictureUrl });
        } catch (err) {
            if (err instanceof z.ZodError) {
                setProfileMessage({ error: err.issues[0].message });
                return;
            }
        }

        setProfileLoading(true);
        try {
            const response = await fetch(getApiUrl(`/users/profile-picture`), {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${cookies.user}`,
                },
                body: JSON.stringify({
                    profilePictureUrl: profilePictureUrl || null,
                }),
            });

            const data = await response.json();

            if (response.ok && !data.error) {
                setProfileMessage({ success: '✓ Profile picture updated successfully!' });
                refreshProfile();
                setTimeout(() => setProfileMessage({}), 3000);
            } else {
                setProfileMessage({ error: data.message || 'Failed to update profile picture' });
            }
        } catch (err) {
            console.error(err);
            setProfileMessage({ error: 'Network error occurred' });
        } finally {
            setProfileLoading(false);
        }
    };

    const handleRemoveProfilePicture = () => {
        setProfilePictureUrl('');
        setTimeout(() => {
            document.getElementById('profile-picture-form')?.dispatchEvent(
                new Event('submit', { cancelable: true, bubbles: true })
            );
        }, 100);
    };

    const handlePasswordChange = async (e: React.FormEvent) => {
        e.preventDefault();
        setPasswordMessage({});

        try {
            passwordSchema.parse(passwords);
        } catch (err) {
            if (err instanceof z.ZodError) {
                setPasswordMessage({ error: err.issues[0].message });
                return;
            }
        }

        setPasswordLoading(true);
        try {
            const response = await fetch(getApiUrl(`/auth/change-password`), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${cookies.user}`,
                },
                body: JSON.stringify({
                    currentPassword: passwords.currentPassword,
                    newPassword: passwords.newPassword,
                    confirmNewPassword: passwords.confirmPassword,
                }),
            });

            const data = await response.json();

            if (response.ok && !data.error) {
                setPasswordMessage({ success: '✓ Password changed successfully!' });
                setPasswords({
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: '',
                });
                setTimeout(() => setPasswordMessage({}), 3000);
            } else {
                setPasswordMessage({ error: data.message || 'Failed to change password' });
            }
        } catch (err) {
            console.error(err);
            setPasswordMessage({ error: 'Network error occurred' });
        } finally {
            setPasswordLoading(false);
        }
    };

    const handleAddCategory = async () => {
        setCategoryMessage({});

        try {
            categorySchema.parse({
                name: catName,
                icon: catEmoji,
                color: catColor,
                type: catType,
            });
        } catch (err) {
            if (err instanceof z.ZodError) {
                setCategoryMessage({ error: err.issues[0].message });
                return;
            }
        }

        setCategoryLoading(true);
        try {
            const response = await fetch(getApiUrl(`/categories`), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${cookies.user}`,
                },
                body: JSON.stringify({
                    name: catName,
                    icon: catEmoji,
                    color: catColor,
                    type: catType,
                }),
            });

            const data = await response.json();

            if (response.ok && !data.error) {
                setCategoryMessage({ success: '✓ Category added successfully!' });
                setCatName('');
                setCatEmoji('🏠');
                setCatColor('#3b82f6');
                setCatType('EXPENSE');
                fetchCategories();
                setTimeout(() => setCategoryMessage({}), 3000);
            } else {
                setCategoryMessage({ error: data.message || 'Failed to add category' });
            }
        } catch (err) {
            console.error(err);
            setCategoryMessage({ error: 'Network error occurred' });
        } finally {
            setCategoryLoading(false);
        }
    };

    const handleDeleteCategory = async (categoryId: number) => {
        if (!confirm('Are you sure you want to delete this category?')) return;

        try {
            const response = await fetch(getApiUrl(`/categories/${categoryId}`), {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${cookies.user}`,
                },
            });

            if (response.ok) {
                fetchCategories();
            } else {
                const data = await response.json();
                alert(data.message || 'Failed to delete category');
            }
        } catch (err) {
            console.error(err);
            alert('Network error occurred');
        }
    };

    return (
        <>
            <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Settings</h2>

                {/* Profile Information */}
                <div
                    className="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-soft border border-border-light dark:border-border-dark overflow-hidden mb-8">
                    <div className="p-6 border-b border-border-light dark:border-border-dark">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Profile Information</h3>
                        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Update your account's profile
                            information and profile picture.</p>
                    </div>

                    <div className="p-6 space-y-6">
                        <form id="profile-picture-form" onSubmit={handleProfilePictureUpdate} className="flex items-start gap-6">
                            {/* Avatar Preview */}
                            <div className="flex flex-col items-center gap-3">
                                {profilePictureUrl ? (
                                    <img
                                        src={profilePictureUrl}
                                        alt="Profile"
                                        className="w-20 h-20 rounded-full object-cover border-4 border-slate-200 dark:border-slate-700"
                                        onError={(e) => {
                                            e.currentTarget.src = `https://ui-avatars.com/api/?name=${userProfile?.firstName}+${userProfile?.lastName}&size=128&background=random`;
                                        }}
                                    />
                                ) : (
                                    <div
                                        className="w-20 h-20 rounded-full bg-gradient-to-tr from-blue-400 to-purple-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                                        {userProfile?.firstName?.[0]}{userProfile?.lastName?.[0]}
                                    </div>
                                )}
                                {profilePictureUrl && (
                                    <button
                                        type="button"
                                        onClick={handleRemoveProfilePicture}
                                        className="text-xs text-red-600 hover:text-red-700 hover:underline"
                                    >
                                        Remove Picture
                                    </button>
                                )}
                            </div>

                            {/* Profile Picture URL Input */}
                            <div className="flex-1 space-y-3">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                                        Profile Picture URL
                                    </label>
                                    <input
                                        type="url"
                                        placeholder="https://example.com/your-photo.jpg"
                                        value={profilePictureUrl}
                                        onChange={(e) => setProfilePictureUrl(e.target.value)}
                                        disabled={profileLoading}
                                        className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none dark:text-white disabled:opacity-50"
                                    />
                                    <p className="text-xs text-slate-500 mt-1">
                                        Use Imgur, Cloudinary, or Gravatar
                                    </p>
                                </div>

                                {profileMessage.error && (
                                    <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                                        <p className="text-sm text-red-600 dark:text-red-400">{profileMessage.error}</p>
                                    </div>
                                )}

                                {profileMessage.success && (
                                    <div className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                                        <p className="text-sm text-green-600 dark:text-green-400">{profileMessage.success}</p>
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={profileLoading}
                                    className="bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {profileLoading ? 'Updating...' : 'Update Picture'}
                                </button>
                            </div>
                        </form>

                        <hr className="border-slate-200 dark:border-slate-800"/>

                        {/* Profile Fields */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">First
                                    Name</label>
                                <input
                                    type="text"
                                    disabled={true}
                                    value={userProfile?.firstName || ''}
                                    className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none dark:text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Last
                                    Name</label>
                                <input
                                    type="text"
                                    disabled={true}
                                    value={userProfile?.lastName || ''}
                                    className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none dark:text-white"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Email
                                    Address</label>
                                <input
                                    type="email"
                                    disabled={true}
                                    value={userProfile?.email || ''}
                                    className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none dark:text-white"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Manage Categories Section */}
                <div
                    className="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-soft border border-border-light dark:border-border-dark overflow-hidden mb-8">
                    <div className="p-6 border-b border-border-light dark:border-border-dark">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Manage Categories</h3>
                        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Create custom categories for your
                            transactions.</p>
                        <p className="text-red-800 text-xl mt-2">Deleting category will delete ALL transactions related to that category!</p>
                    </div>

                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-5">
                            <h4 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">New
                                Category</h4>

                            <div className="flex gap-4">
                                {/* Emoji Input */}
                                <div className="flex-shrink-0">
                                    <label className="block text-xs text-slate-500 mb-1">Icon (Win+.)</label>
                                    <div
                                        className="relative w-14 h-14 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-2xl shadow-sm overflow-hidden group">
                                        <span className="pointer-events-none">{catEmoji}</span>
                                        <input
                                            type="text"
                                            value={catEmoji}
                                            onChange={(e) => setCatEmoji(e.target.value)}
                                            maxLength={2}
                                            className="absolute inset-0 w-full h-full text-center opacity-0 cursor-pointer text-slate-900 dark:text-white"
                                        />
                                    </div>
                                </div>

                                <div className="flex-1">
                                    <label className="block text-xs text-slate-500 mb-1">Name</label>
                                    <input
                                        type="text"
                                        value={catName}
                                        onChange={(e) => setCatName(e.target.value)}
                                        placeholder="e.g. Gym"
                                        disabled={categoryLoading}
                                        className="w-full px-4 py-3.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary outline-none dark:text-white disabled:opacity-50"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs text-slate-500 mb-1">Type</label>
                                <div
                                    className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-lg border border-slate-200 dark:border-slate-700">
                                    <button
                                        type="button"
                                        onClick={() => setCatType('EXPENSE')}
                                        disabled={categoryLoading}
                                        className={`flex-1 py-2 rounded-md text-sm font-bold transition-all ${catType === 'EXPENSE' ? 'bg-white dark:bg-slate-700 shadow text-slate-900 dark:text-white' : 'text-slate-500'}`}
                                    >Expense
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setCatType('INCOME')}
                                        disabled={categoryLoading}
                                        className={`flex-1 py-2 rounded-md text-sm font-bold transition-all ${catType === 'INCOME' ? 'bg-white dark:bg-slate-700 shadow text-slate-900 dark:text-white' : 'text-slate-500'}`}
                                    >Income
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs text-slate-500 mb-2">Color</label>
                                <div className="flex flex-wrap gap-2 items-center">
                                    {presetColors.map(c => (
                                        <button
                                            key={c}
                                            type="button"
                                            onClick={() => setCatColor(c)}
                                            disabled={categoryLoading}
                                            className={`w-8 h-8 rounded-full transition-all ${catColor === c ? 'ring-2 ring-offset-2 ring-primary dark:ring-offset-slate-800 scale-110' : ''}`}
                                            style={{backgroundColor: c}}
                                        ></button>
                                    ))}
                                    {/* Native HEX Input */}
                                    <div className="relative group">
                                        <div
                                            className={`w-8 h-8 rounded-full cursor-pointer transition-all bg-gradient-to-tr from-gray-200 to-gray-400 dark:from-slate-700 dark:to-slate-600 flex items-center justify-center ${!presetColors.includes(catColor) ? 'ring-2 ring-offset-2 ring-primary dark:ring-offset-slate-800' : ''}`}
                                        >
                                            <span
                                                className="material-icons text-slate-600 dark:text-slate-300 text-xs">add</span>
                                        </div>
                                        <input
                                            type="color"
                                            value={catColor}
                                            onChange={(e) => setCatColor(e.target.value)}
                                            disabled={categoryLoading}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        />
                                    </div>
                                </div>
                            </div>

                            {categoryMessage.error && (
                                <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                                    <p className="text-sm text-red-600 dark:text-red-400">{categoryMessage.error}</p>
                                </div>
                            )}

                            {categoryMessage.success && (
                                <div className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                                    <p className="text-sm text-green-600 dark:text-green-400">{categoryMessage.success}</p>
                                </div>
                            )}

                            <button
                                type="button"
                                onClick={handleAddCategory}
                                disabled={categoryLoading}
                                className="w-full py-3 rounded-lg text-white font-bold hover:opacity-90 transition-opacity mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                style={{backgroundColor: catColor, boxShadow: `0 4px 14px 0 ${catColor}66`}}
                            >
                                {categoryLoading ? 'Adding...' : 'Add Category'}
                            </button>
                        </div>

                        {/* Existing Categories List */}
                        <div>
                            <h4 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">Existing</h4>
                            <div className="space-y-2 max-h-80 overflow-y-auto pr-2">
                                {categories.map(c => (
                                    <div key={c.id}
                                         className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                                        <div className="flex items-center gap-3">
                                            <div
                                                className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
                                                style={{backgroundColor: `${c.color}20`}}>
                                                {c.icon}
                                            </div>
                                            <div>
                                                <span className="text-sm font-bold text-slate-900 dark:text-white">{c.name}</span>
                                                <span className="text-xs text-slate-500 ml-2">({c.type.toLowerCase()})</span>
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => handleDeleteCategory(c.id)}
                                            className="text-slate-400 hover:text-red-500 p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
                                            <span className="material-icons-round text-sm">delete</span>
                                        </button>
                                    </div>
                                ))}
                                {categories.length === 0 && (
                                    <p className="text-sm text-slate-500 text-center py-4">No categories yet</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Preferences */}
                <div
                    className="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-soft border border-border-light dark:border-border-dark overflow-hidden mb-8">
                    <div className="p-6 border-b border-border-light dark:border-border-dark">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Preferences</h3>
                        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Manage your display and currency
                            settings.</p>
                    </div>

                    <div className="p-6 space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h4 className="font-medium text-slate-900 dark:text-white">Dark Mode</h4>
                                <p className="text-sm text-slate-500 dark:text-slate-400">Use system preference by
                                    default</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" defaultChecked className="sr-only peer"/>
                                <div
                                    className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                            </label>
                        </div>

                        <hr className="border-slate-200 dark:border-slate-800"/>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label
                                    className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Currency</label>
                                <select
                                    disabled
                                    value={userProfile?.defaultCurrency || 'USD'}
                                    className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none dark:text-white">
                                    <option>USD ($)</option>
                                    <option>EUR (€)</option>
                                    <option>PLN (zł)</option>
                                </select>
                            </div>
                            <div>
                                <label
                                    className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Language</label>
                                <select
                                    disabled
                                    className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none dark:text-white">
                                    <option>English</option>
                                    <option>Polish</option>
                                    <option>Spanish</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-900/50 px-6 py-4 flex justify-end">
                        <button
                            disabled
                            className="bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors shadow-sm opacity-50 cursor-not-allowed">
                            Save Preferences
                        </button>
                    </div>
                </div>

                {/* Security */}
                <div
                    className="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-soft border border-border-light dark:border-border-dark overflow-hidden">
                    <div className="p-6 border-b border-border-light dark:border-border-dark">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Security</h3>
                        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Update your password and security
                            settings.</p>
                    </div>

                    <div className="p-6">
                        <form onSubmit={handlePasswordChange} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                                    Current Password
                                </label>
                                <input
                                    type="password"
                                    placeholder="Enter your current password"
                                    value={passwords.currentPassword}
                                    onChange={(e) => setPasswords({...passwords, currentPassword: e.target.value})}
                                    disabled={passwordLoading}
                                    className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary outline-none dark:text-white disabled:opacity-50"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                                    New Password
                                </label>
                                <input
                                    type="password"
                                    placeholder="Enter your new password"
                                    value={passwords.newPassword}
                                    onChange={(e) => setPasswords({...passwords, newPassword: e.target.value})}
                                    disabled={passwordLoading}
                                    className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary outline-none dark:text-white disabled:opacity-50"
                                />
                                <p className="text-xs text-slate-500 mt-1">Must be at least 8 characters</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                                    Confirm New Password
                                </label>
                                <input
                                    type="password"
                                    placeholder="Confirm your new password"
                                    value={passwords.confirmPassword}
                                    onChange={(e) => setPasswords({...passwords, confirmPassword: e.target.value})}
                                    disabled={passwordLoading}
                                    className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary outline-none dark:text-white disabled:opacity-50"
                                />
                            </div>

                            {passwordMessage.error && (
                                <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                                    <p className="text-sm text-red-600 dark:text-red-400">{passwordMessage.error}</p>
                                </div>
                            )}

                            {passwordMessage.success && (
                                <div className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                                    <p className="text-sm text-green-600 dark:text-green-400">{passwordMessage.success}</p>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={passwordLoading}
                                className="bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {passwordLoading ? 'Changing...' : 'Change Password'}
                            </button>
                        </form>

                        <hr className="border-slate-200 dark:border-slate-800 my-6"/>

                        <div>
                            <button
                                disabled
                                className="text-red-600 font-medium hover:text-red-700 flex items-center gap-2 opacity-50 cursor-not-allowed">
                                <span className="material-icons-round text-sm">no_accounts</span>
                                Delete Account
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Settings;
