import { getProviders, signIn } from 'next-auth/react';

function Login({ providers }) {
    return (
        <div className="flex flex-col items-center bg-black min-h-screen w-full justify-center">
            <img
                className="w-52 mb-5"
                src="https://external-preview.redd.it/iDdntscPf-nfWKqzHRGFmhVxZm4hZgaKe5oyFws-yzA.png?width=640&crop=smart&auto=webp&s=bfd318557bf2a5b3602367c9c4d9cd84d917ccd5"
                alt=""
            />

            {Object.values(providers).map((provider) => (
                <div key={provider.id}>
                    <button
                        className="bg-[#FF4500] p-5 rounded-xl text-white"
                        onClick={() =>
                            signIn(provider.id, { callbackUrl: '/' })
                        }>
                        Login with {provider.name}
                    </button>
                </div>
            ))}
        </div>
    );
}

export default Login;

export async function getServerSideProps() {
    return {
        props: {
            providers: await getProviders(),
        },
    };
}
