import { TopBar } from "./SistemasMovil/TopBar";
import { Table } from "./SistemasMovil/Table";

export function SistemasMovil() {
    return (
        <div>
            <TopBar tituloBarra="Mi Horario" />
            <Table />
        </div>
    );
}
