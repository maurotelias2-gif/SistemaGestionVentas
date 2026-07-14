#!/bin/bash

cd "$(dirname "$0")"

echo "Ingrese el mensaje del commit:"
read mensajeCommit

git add .

if git diff --cached --quiet
then
    mensaje="ALERTA: no se encontraron cambios para realizar un commit."

    echo "$mensaje"

    echo "" >> README.md
    echo "$mensaje" >> README.md

else
lineas=$(git diff --cached --numstat | awk '
    {
        if ($1 != "-") agregadas += $1
        if ($2 != "-") eliminadas += $2
    }
    END {
        print agregadas + eliminadas
    }')

    mensaje="Se modificaron $lineas líneas."

    echo "$mensaje"

    echo "" >> README.md
    echo "$mensaje" >> README.md

    git add README.md

    git commit -m "$mensajeCommit"

    git push

fi