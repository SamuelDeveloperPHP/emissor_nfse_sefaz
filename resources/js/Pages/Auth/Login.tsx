import React, { useEffect, useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import './login.css';
import { avisarCamposInvalidos } from '../../common/alerta';

const registros = [
    { texto: 'Emita uma nota avulsa ou envie um lote por planilha CSV.', valor: '5.000', unidade: 'linhas por lote' },
    { texto: 'Cada contador enxerga apenas os CNPJs liberados para ele.', valor: 'CNPJ', unidade: 'acesso por emitente' },
    { texto: 'Acompanhe as notas por dia, semana, mês e ano.', valor: '4', unidade: 'períodos no painel' },
    { texto: 'Leiaute do padrão federal, validado contra o esquema oficial.', valor: '1.01', unidade: 'NFS-e Nacional' },
];

export default function Login({ status, canResetPassword }: any) {
    const [mostrarSenha, setMostrarSenha] = useState<boolean>(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('login'), { onError: avisarCamposInvalidos });
    };

    return (
        <div className="lg-root">
            <Head>
                <title>Entrar - Emissor NFS-e</title>
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    rel="stylesheet"
                    href="https://fonts.bunny.net/css?family=ibm-plex-sans:400,500,600|source-serif-4:600&display=swap"
                />
            </Head>

            <section className="lg-book" aria-label="Sobre o sistema">
                <h2 className="lg-brand">
                    Emissor NFS-e
                    <small>Notas fiscais de serviço para escritórios de contabilidade</small>
                </h2>

                <ul className="lg-ledger">
                    {registros.map((item) => (
                        <li key={item.unidade}>
                            <span className="lg-what">{item.texto}</span>
                            <span className="lg-amount">
                                {item.valor}
                                <span>{item.unidade}</span>
                            </span>
                        </li>
                    ))}
                </ul>

                <p className="lg-book-foot">
                    Certificado digital A1, histórico de cada nota e motivo de rejeição em linguagem simples.
                </p>
            </section>

            <main className="lg-form-side">
                <form className="lg-form" onSubmit={submit} noValidate>
                    <h1>Entrar</h1>
                    <p className="lg-lead">Use o e-mail e a senha que o administrador do escritório cadastrou para você.</p>

                    {status && <div className="lg-status" role="status">{status}</div>}

                    <div className="lg-field">
                        <label htmlFor="email">E-mail</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            className={'lg-input' + (errors.email ? ' is-invalid' : '')}
                            value={data.email}
                            autoComplete="username"
                            autoFocus
                            required
                            aria-invalid={!!errors.email}
                            aria-describedby={errors.email ? 'email-erro' : undefined}
                            onChange={(e) => setData('email', e.target.value)}
                        />
                        {errors.email && <p className="lg-error" id="email-erro">{errors.email}</p>}
                    </div>

                    <div className="lg-field">
                        <label htmlFor="password">Senha</label>
                        <div className="lg-input-wrap">
                            <input
                                id="password"
                                name="password"
                                type={mostrarSenha ? 'text' : 'password'}
                                className={'lg-input' + (errors.password ? ' is-invalid' : '')}
                                value={data.password}
                                autoComplete="current-password"
                                required
                                aria-invalid={!!errors.password}
                                aria-describedby={errors.password ? 'senha-erro' : undefined}
                                onChange={(e) => setData('password', e.target.value)}
                            />
                            <button
                                type="button"
                                className="lg-toggle"
                                onClick={() => setMostrarSenha(!mostrarSenha)}
                                aria-pressed={mostrarSenha}
                            >
                                {mostrarSenha ? 'Ocultar' : 'Mostrar'}
                            </button>
                        </div>
                        {errors.password && <p className="lg-error" id="senha-erro">{errors.password}</p>}
                    </div>

                    <div className="lg-row">
                        <label className="lg-remember">
                            <input
                                type="checkbox"
                                name="remember"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                            />
                            Manter conectado
                        </label>
                        {canResetPassword && (
                            <Link href={route('password.request')} className="lg-link">
                                Esqueci a senha
                            </Link>
                        )}
                    </div>

                    <button type="submit" className="lg-submit" disabled={processing}>
                        {processing ? 'Entrando...' : 'Entrar'}
                    </button>

                    <p className="lg-help">Ainda não tem acesso? Peça ao administrador do seu escritório para criar o seu usuário.</p>
                </form>
            </main>
        </div>
    );
}
