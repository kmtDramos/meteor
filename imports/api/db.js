/**/

export const db = {
	Usuario: new Mongo.Collection('Usuario'),
	Cliente: new Mongo.Collection('Cliente'),
	Proveedor: new Mongo.Collection('Proveedor'),
	Pagina: new Mongo.Collection('Pagina'),
	Privilegio: new Mongo.Collection('Privilegio'),
	CentroDeCosto: new Mongo.Collection('CentroDeCosto'),
	Factura: new Mongo.Collection('Factura')
}