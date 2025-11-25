import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function ForgotPassword({ status }) {
    const [step, setStep] = useState(1); // Step 1: Request Code, Step 2: Verify & Reset
    const [email, setEmail] = useState('');

    // Form for requesting the reset code
    const { data: requestData, setData: setRequestData, post: postRequest, processing: requestProcessing, errors: requestErrors } = useForm({
        email: '',
    });

    // Form for resetting password with code
    const { data: resetData, setData: setResetData, post: postReset, processing: resetProcessing, errors: resetErrors } = useForm({
        email: '',
        code: '',
        password: '',
        password_confirmation: '',
    });

    const submitRequestCode = (e) => {
        e.preventDefault();

        postRequest(route('password.email'), {
            onSuccess: () => {
                setEmail(requestData.email);
                setResetData('email', requestData.email);
                setStep(2);
            },
        });
    };

    const submitResetPassword = (e) => {
        e.preventDefault();

        postReset(route('password.store'));
    };

    return (
        <GuestLayout>
            <Head title="Forgot Password" />

            {step === 1 ? (
                <>
                    <div className="mb-4 text-sm text-gray-600">
                        Forgot your password? No problem. Enter your email address 
                        and we'll send you a 6-digit verification code to reset your password.
                    </div>

                    {status && (
                        <div className="mb-4 text-sm font-medium text-green-600">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submitRequestCode}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Email Address
                            </label>
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={requestData.email}
                                className="mt-1 block w-full"
                                isFocused={true}
                                onChange={(e) => setRequestData('email', e.target.value)}
                                required
                            />
                            <InputError message={requestErrors.email} className="mt-2" />
                        </div>

                        <div className="mt-6 flex items-center justify-end">
                            <PrimaryButton disabled={requestProcessing}>
                                {requestProcessing ? 'Sending Code...' : 'Send Verification Code'}
                            </PrimaryButton>
                        </div>
                    </form>
                </>
            ) : (
                <>
                    <div className="mb-4 text-sm text-gray-600">
                        <p className="mb-2">
                            A 6-digit verification code has been sent to <strong>{email}</strong>.
                        </p>
                        <p>
                            Enter the code and your new password below. The code will expire in 15 minutes.
                        </p>
                    </div>

                    {status && (
                        <div className="mb-4 text-sm font-medium text-green-600">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submitResetPassword}>
                        <div>
                            <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">
                                6-Digit Verification Code
                            </label>
                            <TextInput
                                id="code"
                                type="text"
                                name="code"
                                value={resetData.code}
                                className="mt-1 block w-full text-center text-2xl font-bold tracking-widest"
                                isFocused={true}
                                onChange={(e) => setResetData('code', e.target.value.replace(/\D/g, '').slice(0, 6))}
                                maxLength={6}
                                placeholder="000000"
                                required
                            />
                            <InputError message={resetErrors.code} className="mt-2" />
                        </div>

                        <div className="mt-4">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                New Password
                            </label>
                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={resetData.password}
                                className="mt-1 block w-full"
                                onChange={(e) => setResetData('password', e.target.value)}
                                required
                            />
                            <InputError message={resetErrors.password} className="mt-2" />
                        </div>

                        <div className="mt-4">
                            <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700 mb-1">
                                Confirm New Password
                            </label>
                            <TextInput
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                value={resetData.password_confirmation}
                                className="mt-1 block w-full"
                                onChange={(e) => setResetData('password_confirmation', e.target.value)}
                                required
                            />
                            <InputError message={resetErrors.password_confirmation} className="mt-2" />
                        </div>

                        <div className="mt-6 flex items-center justify-between">
                            <button
                                type="button"
                                onClick={() => setStep(1)}
                                className="text-sm text-gray-600 hover:text-gray-900 underline"
                            >
                                Back to Email Entry
                            </button>

                            <PrimaryButton disabled={resetProcessing}>
                                {resetProcessing ? 'Resetting Password...' : 'Reset Password'}
                            </PrimaryButton>
                        </div>
                    </form>

                    <div className="mt-4 text-center">
                        <button
                            type="button"
                            onClick={() => {
                                setRequestData('email', email);
                                postRequest(route('password.email'));
                            }}
                            className="text-sm text-indigo-600 hover:text-indigo-900 underline"
                            disabled={requestProcessing}
                        >
                            Didn't receive the code? Resend
                        </button>
                    </div>
                </>
            )}
        </GuestLayout>
    );
}
