import {models} from './data.js'
import { byCategory, search, top, total, categories } from './catalog.js'
import { writeFile } from 'node:fs/promises'

const [cmd, arg] = process.argv.slice(2)

if(!cmd) { //todos
    console.log(models)
} 
else if (cmd === 'top') {
    console.log(top(models, Number(arg)))
} //pesquisa
else if (cmd === 'search') {
    console.log(search(models, arg || ''))
} // cria report.json
else if (cmd === 'report') {

    const report = {count: models.length,
         total: total(models),
         categories: categories(models), 
         top3: top(models, 3)
    }

    await writeFile(
        'report.json', JSON.stringify(report, null, 2)
    )
} // categoria
else{
    console.log(byCategory(models, cmd))
}

