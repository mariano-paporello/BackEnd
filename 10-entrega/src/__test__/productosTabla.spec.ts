
import {crear5Productos} from "../Controllers/testController"
describe('conjunto de pruebas de creacion de productos', () => {
    it('deben de ser correctamente creadas y de tipo producto', () => {
    const lol = crear5Productos()
    expect(lol.length).toBe(5)
}
)})