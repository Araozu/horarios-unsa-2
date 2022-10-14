
// Exclusivo de un unico dia
import { GrupoDia, TableInput } from "../src/Views/SistemasMovil/Table";
import { generarMapaCeldas, MapaCeldas } from "../src/Views/SistemasMovil/mapaCeldas";

type Input = {
    offsetVertical: number,
    nroHoras: number,
}


describe("generarMapaCeldas", () => {
    it("vacio si input es vacio", () => {
        const input: Array<GrupoDia> = [];
        const output = generarMapaCeldas(input);
        expect(output.length).toBe(0);
    });

    it("funciona con 1 curso", () => {
        const input: Array<any> = [
            {
                offsetVertical: 0,
                nroHoras: 2,
            },
        ];
        const output = generarMapaCeldas(input)[0];
        expect(output).not.toBeUndefined();
        expect(output.offsetHorizontal).toBe(0);
        expect(output.fraccion).toBe(1);
    });

    it("funciona con 2 cursos", () => {
        const input: Array<any> = [
            {
                offsetVertical: 0,
                nroHoras: 2,
            },
            {
                offsetVertical: 1,
                nroHoras: 3,
            },
        ];

        const output1 = generarMapaCeldas(input)[0];
        expect(output1.offsetHorizontal).toBe(0);
        expect(output1.fraccion).toBe(2);

        const output2 = generarMapaCeldas(input)[1];
        expect(output2.offsetHorizontal).toBe(1);
        expect(output2.fraccion).toBe(2);
    });
});

describe("MapaCeldas", () => {
    it("crea 1", () => {
        const mapa = new MapaCeldas();
        const input = {} as unknown as Input;
        const offset = mapa.solicitar(0, 2);
        expect(offset).toBe(0);
    });

    it("crea varios que no se solapan", () => {
        const mapa = new MapaCeldas();
        const input = {} as unknown as Input;
        let offset = mapa.solicitar(0, 2);
        expect(offset).toBe(0);
        offset = mapa.solicitar(4, 3);
        expect(offset).toBe(0);
        offset = mapa.solicitar(7, 4);
        expect(offset).toBe(0);
    });

    it("crea varios que se solapan", () => {
        const mapa = new MapaCeldas();
        const input = {} as unknown as Input;
        let offset = mapa.solicitar(0, 2);
        expect(offset).toBe(0);
        offset = mapa.solicitar(0, 2);
        expect(offset).toBe(1);
        offset = mapa.solicitar(0, 4);
        expect(offset).toBe(2);
    });

    it("crea varios que se solapan de formas diferentes", () => {
        /*
            x
            x x x
            y x x
            y x x
            y z x
              z
              z
         */
        const mapa = new MapaCeldas();
        const input = {} as unknown as Input;
        let offset = mapa.solicitar(0, 2);
        expect(offset).toBe(0);
        offset = mapa.solicitar(1, 3);
        expect(offset).toBe(1);
        offset = mapa.solicitar(1, 4);
        expect(offset).toBe(2);
        offset = mapa.solicitar(2, 3);
        expect(offset).toBe(0);
        offset = mapa.solicitar(4, 2);
        expect(offset).toBe(1);
    });

    it("genera offsets", () => {
        const mapa = new MapaCeldas();
        const input = {} as unknown as Input;
        let offset = mapa.solicitar(0, 2);
        expect(offset).toBe(0);
        let fraccion = mapa.generarFraccion(0, offset, 2);
        expect(fraccion).toBe(1);

        offset = mapa.solicitar(1, 3);
        fraccion = mapa.generarFraccion(1, offset, 3);
        expect(fraccion).toBe(2);

        mapa.solicitar(1, 4);
        mapa.solicitar(2, 3);
        offset = mapa.solicitar(4, 2);
        fraccion = mapa.generarFraccion(4, offset, 2);
        expect(fraccion).toBe(3);
    });
});

export {};
