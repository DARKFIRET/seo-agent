import fs from 'fs';

const html = fs.readFileSync('dist/stats.html', 'utf8');

// Строго ищем все вхождения размера файлов
const objRegex = /\{([^}]*"name":"([^"]+)"[^}]*"renderedLength":(\d+)[^}]*)\}/g;
let objMatch;
const modules = [];

while ((objMatch = objRegex.exec(html)) !== null) {
  if (objMatch[2] !== 'root' && objMatch[2] !== '') {
    modules.push({
      name: objMatch[2],
      renderedLength: parseInt(objMatch[3])
    });
  }
}

modules.sort((a, b) => b.renderedLength - a.renderedLength);

console.log("=== САМЫЕ ТЯЖЕЛЫЕ МОДУЛИ JS БАНДЛА ===");
// Убираем дубликаты
const seen = new Set();
const uniqueModules = modules.filter(m => {
  if (!seen.has(m.name)) {
    seen.add(m.name);
    return true;
  }
  return false;
});

// Выводим ТОП-25 самых тяжелых файлов
uniqueModules.slice(0, 25).forEach((m, i) => {
  console.log(`${i + 1}. ${Math.round(m.renderedLength / 1024)} KB \t ${m.name.split('/').pop()}`);
});
