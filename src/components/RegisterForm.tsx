import { useForm } from 'react-hook-form';
import { useAuth } from '../hooks/useAuth';

type RegisterFormData = {
    name: string;
    email: string;
    password: string;
    repeatPassword: string;
};

const RegisterForm: React.FC = () => {
    const { register: registerUser, error } = useAuth();
    const { register, handleSubmit, formState: { errors }, getValues, reset } = useForm<RegisterFormData>();

    const onSubmit = (data: RegisterFormData) => {
        registerUser(data);
        reset()
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl w-full flex flex-col gap-2">
            <input
                {...register('name', { required: 'Name is required' })}
                type="text"
                placeholder="Name"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}

            <input
                {...register('email', {
                    required: 'Email is required',
                    pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Entered value does not match email format"
                    }
                })}
                type="email"
                placeholder="Email"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}

            <input
                {...register('password', {
                    required: 'Password is required',
                    minLength: {
                        value: 8,
                        message: 'Password must have at least 8 characters'
                    }
                })}
                type="password"
                placeholder="Password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}

            <input
                {...register('repeatPassword', {
                    validate: value => value === getValues('password') || 'The passwords do not match'
                })}
                type="password"
                placeholder="Repeat Password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.repeatPassword && <span className="text-red-500 text-sm">{errors.repeatPassword.message}</span>}

            {error && <span className="text-red-500 text-sm">{error}</span>}

            <input
                type="submit"
                value="Register"
                className="w-full cursor-pointer bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            />
        </form>
    );
};

export default RegisterForm;