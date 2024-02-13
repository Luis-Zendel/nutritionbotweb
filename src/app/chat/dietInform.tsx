import { Typography } from "@material-tailwind/react";

type Props = {
    title: string,
    content: Array<string>,
    colorBase: string,
    colorSecundario: string
}

function DesayunoCard({ title, content, colorBase, colorSecundario }: Props) {
    const opciones: Array<string> = [];

    const coloresOpciones = ["teal-400", "blue-300", "teal-200", "blue-200"];


    const iconosOpciones = ["fas fa-egg", "fas fa-bread-slice", "fas fa-bacon", "fas fa-pancakes"];



    return (
        <div className={`bg-gradient-to-r from-teal-400 to-${colorSecundario} rounded-lg shadow-md p-4`}>
            <Typography
                variant="h3"
                className="leading-[45px] mb-4 !text-white "
            >
                {title}
            </Typography>

            <div className="grid grid-cols-3 gap-4">
                {content.map((opcion, i) => (
                    <div key={i} className="bg-white rounded-lg p-4 flex flex-col items-center">
                        <i className={`${iconosOpciones[i]} text-${coloresOpciones[i]} text-4xl mb-2`}></i>
                        <p className="text-center">{opcion}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export { DesayunoCard };
