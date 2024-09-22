import {useForm} from "react-hook-form";
import {useAuth} from "../hooks/useAuth.ts";

type LoginFormData = {
    email: string;
    password: string;
};
const LoginForm: React.FC = () => {
    const { login: loginUser, error } = useAuth();
    const { register, handleSubmit, formState: { errors }, reset} = useForm<LoginFormData>();

    const onSubmit = (data: LoginFormData) => {
        loginUser(data);
        reset();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={'max-w-xl w-full flex flex-col gap-2'}>
            <input
                {...register('email', { required: 'Email is required' })}
                type="text" placeholder="Email"
                className={'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'}
            />
            {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
            <input
                {...register('password', { required: 'Password is required' })}
                type="password" placeholder="Password"
                className={'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'}
            />
            {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
            {error && <span className="text-red-500 text-sm">{error}</span>}
            <input type={'submit'} value={'Login'}
                   className={'w-full cursor-pointer bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'}/>
        </form>
    )
};

export default LoginForm;