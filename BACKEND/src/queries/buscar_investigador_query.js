const get = "MATCH (i:Investigador {id: $investigadorId}) OPTIONAL MATCH (i)-[:PARTICIPA_EN]->(p:Proyecto) RETURN i.nombre_completo AS nombreInvestigador, i.titulo_academico AS tituloAcademico, i.institucion AS institucion, i.email AS email, COLLECT(p) AS proyectos;"


module.exports = {
    get
}





