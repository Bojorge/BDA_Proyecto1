const get = "MATCH (p:Proyecto) WITH p.area_conocimiento AS area, COUNT(p) AS cantidad ORDER BY cantidad DESC LIMIT 5 RETURN area, cantidad;"

//const get = "MATCH (p:Proyecto) WHERE p.titulo_proyecto CONTAINS 'Investiga' WITH p.area_conocimiento AS area, COUNT(p) AS cantidad ORDER BY cantidad DESC LIMIT 5 RETURN area, cantidad;"


module.exports = {
    get
}