import { useState } from "react";
import { loginUser } from "../store/general.actions";
import { useNavigate } from "react-router-dom";


export const AuthPage = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginUser({
      identifier: email,
      password: password
    }).then((res) => {
      if (res) {
        navigate("/")
      }
    })
  };

  return (
    <section className="bg-primary-opacity min-h-screen flex items-center md:justify-start justify-center">
      <div className="w-full lg:w-4/12 px-4 pt-6 bg-white shadow-lg ml-0 md:ml-5 rounded-lg">
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6  rounded-lg border-0">

          <div className="flex-auto px-4 lg:px-10 py-10 pt-5 flex flex-col gap-5 justify-between rounded-md">
            <h2 className="text-3xl">Ingresa tu cuenta</h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-600 font-medium mb-2">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={handleEmailChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-gray-600 font-medium mb-2">
                  Contraseña
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={handlePasswordChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
                >
                  Iniciar sesión
                </button>
              </div>
            </form>



            {/* <InputTextError isError={errors.length > 1} msg={errors} /> */}
          </div>
        </div>
      </div>
    </section>
  )
}