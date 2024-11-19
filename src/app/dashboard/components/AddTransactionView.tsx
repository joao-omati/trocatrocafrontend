'use client';

import { useEffect, useState } from "react";
import { TransactionProps } from "../local-constants";
import CurrencyInput from "@/global-components/CurrencyInput";
type TrasactionViewProps = {
    sendShowComponent: (showComponent: string) => void;
};
const Modal = ({ result, closeModal }: { result: number | null, closeModal: () => void }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-dark p-6 rounded-md shadow-md max-w-sm w-full">
            <p className="mt-4 text-center">
                {result === 200 && "Cartão cadastrado com sucesso."}
                {result === 500 && "Houve um erro no servidor."}
                {result === 401 && "Você não tem permissão para realizar esta ação."}
                {result === 409 && "Cartão já cadastrado."}
                {result === null && "Erro desconhecido."}
            </p>
            <div className="mt-6 text-center">
                <button
                    onClick={closeModal}
                    className="w-full py-2 px-4 bg-black text-white rounded-md hover:bg-slate-800"
                >
                    Fechar
                </button>
            </div>
        </div>
    </div>
);


export default function CardView({ sendShowComponent }: TrasactionViewProps) {
    const [showComponent, setShowComponent] = useState<string>("none");
    const [showModal, setShowModal] = useState(false);
    const [result, setResult] = useState<number | null>(null);

    const formatCardNumber = (e: React.FormEvent<HTMLInputElement>) => {
        const input = e.currentTarget;
        let value = input.value.replace(/\D/g, '');
        value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
        input.value = value.trim();
    };

    const handleShowComponent = () => {
        setShowComponent("none");
        sendShowComponent(showComponent);
    };



    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const formData = new FormData(event.currentTarget);

        } catch (error) {

            console.error(error);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <form onSubmit={handleSubmit} className="bg-dark p-4 rounded-lg">
                <div className="flex flex-col mb-4">
                    <label className="text-sm text-light">Número do Cartão</label>
                    <input
                        type="text"
                        name="cardNumber"
                        className="p-2 rounded-md bg-semiDark text-light"
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                        pattern="\d{4}\s\d{4}\s\d{4}\s\d{4}"
                        onInput={(e) => formatCardNumber(e)}
                        required
                    />
                </div>
                <div className="flex flex-col mb-4">
                    <input
                        type="text"
                        name="cvv"
                        className="p-2 rounded-md bg-semiDark text-light"
                        maxLength={3}
                        pattern="\d{3}"
                        placeholder="123"
                        onInput={(e) => e.currentTarget.value = e.currentTarget.value.replace(/\D/g, '')}
                        required
                    />
                </div>

                <div className="flex flex-col mb-4">
                    <input

                        type="month"

                        name="expirationDate"

                        className="p-2 rounded-md bg-semiDark text-light"

                        onChange={handleDateChange}

                        required

                    />
                </div>

                <div className="flex flex-col mb-4">
                    <div className="flex items-center mb-2">
                        <input
                            type="checkbox"
                            name="cardType"
                            value="debit"
                            className="mr-2"
                            checked={isDebit}
                            onChange={handleCheckboxChange}
                            required={!isCredit}
                        />
                        <span className="text-light">Débito</span>
                    </div>
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            name="cardType"
                            value="credit"
                            className="mr-2"
                            checked={isCredit}
                            onChange={handleCheckboxChange}
                            required={!isDebit}
                        />
                        <span className="text-light">Crédito</span>
                    </div>
                </div>

                {isCredit && (
                    <div className="flex flex-col mb-4">
                        <label className="text-sm text-light">Limite</label>
                        <CurrencyInput
                            name="limit"
                            className="p-2 rounded-md bg-semiDark text-light"
                            required
                        />


                    </div>
                )}
                <div className="flex items-center justify-between">
                    <button
                        className="bg-accent hover:bg-lightAccent text-dark font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Cadastrar
                    </button>
                    <button
                        className="bg-rose-800 hover:bg-rose-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button"
                        onClick={handleShowComponent}
                    >
                        Cancelar
                    </button>
                </div>
            </form>
            {showModal && <Modal result={result} closeModal={() => setShowModal(false)} />}

        </div>
    );
}