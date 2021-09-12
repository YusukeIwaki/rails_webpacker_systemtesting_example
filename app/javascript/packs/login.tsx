import React, { useState, useEffect } from 'react'
import ReactDom from 'react-dom'
import { useForm } from 'react-hook-form'

interface AppProps {
    url: string,
    authenticityToken: string,
}

interface LoginFormResult {
    name: string,
    password: string,
}

const App = (props: AppProps) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [result, setResult] = useState<LoginFormResult | null>(null);
    const onFormSubmit = (data) => setResult(data);

    useEffect(() => {
        if (result) {
            const form = document.getElementById('_form') as HTMLFormElement
            form.requestSubmit()
        }
    }, [result])

    const inputClass = [
        'shadow',
        'appearance-none',
        'border',
        'rounded',
        'w-full',
        'py-2',
        'px-3',
        'text-gray-700',
        'leading-tight',
        'focus:outline-none',
        'focus:shadow-outline',
    ]
    const errorClass = [
        'border-red-500'
    ]

    return (
        <>
            <div className="w-full max-w-xs">
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit(onFormSubmit)}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                            Name
                        </label>
                        {errors.name?.type == 'required' && <p>REQUIRED</p>}
                        <input className={errors.name ? inputClass.concat(errorClass).join(" ") : inputClass.join(" ")} {...register('name', { required: true })} />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                            Password
                        </label>
                        {errors.password?.type == 'required' && <p>REQUIRED</p>}
                        {errors.password?.type == 'minLength' && <p>TOO SHORT</p>}
                        <input className={errors.name ? inputClass.concat(errorClass).join(" ") : inputClass.join(" ")} type='password' {...register('password', { required: true, minLength: 8 })} />
                    </div>
                    <input type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" />
                </form>
            </div>
            {result && (
                <form id="_form" style={{ display: 'none' }} method="POST" action={props.url}>
                    <input name="name" value={result.name} />
                    <input type="password" name="password" value={result.password} />
                    <input type="hidden" name="authenticity_token" value={props.authenticityToken} />
                </form>
            )}
        </>
    )
}
document.addEventListener('DOMContentLoaded', (e) => {
    const container = document.getElementById('login-form')
    container.setAttribute('class', 'flex justify-center')
    ReactDom.render(<App url={container.dataset.postUrl} authenticityToken={container.dataset.authenticityToken} />, container)
}, false)
