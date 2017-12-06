# java-mutation

> An automatically UT generate and excute tool use NodeJs.

- [java-mutation](#java-mutation)
    - [Introduction](#introduction)
    - [Xlsx Format](#xlsx-format)
    - [Pre-installation](#pre-installation)
    - [Build Setup](#build-setup)
    - [Reference](#reference)

## Introduction
This is a java unit test generate tool. It loads use case defined in xlsx file and generate test code.

## Xlsx Format
| Function name | Function1     | Use case1 | Use case2 | ... | Use caseN | 
|:-------------:|:-------------:|:---------:|:---------:|:---:|:---------:|
| Input         | parameters    |           |           |     |           |
| ...           |               |           |           |     |           |
| Output        | return        |           |           |     |           |
| ...           |               |           |           |     |           |
| Call function |               |           |           |     |           |
| ...           |               |           |           |     |           |

## Pre-installation
[NodeJS](https://nodejs.org/en/) - v6.9.2 or higher

## Build Setup
``` bash
# install dependencies
npm install

# serve with hot reload at localhost:9080
npm run dev

# build electron application for production
npm run build


# lint all JS/Vue component files in `src/`
npm run lint

```
## Reference
[Vue](https://vuejs.org/)  
[Electron](https://electron.org.cn/)  
[Electron-Vue](https://simulatedgreg.gitbooks.io/electron-vue/content/index.html)  
[XLSX API](https://github.com/SheetJS/js-xlsx)  
[Junit API](http://junit.sourceforge.net/javadoc/org/junit/runner/JUnitCore.html)

---

This project was generated with [electron-vue](https://github.com/SimulatedGREG/electron-vue)@[f5d9648](https://github.com/SimulatedGREG/electron-vue/tree/f5d9648e169a3efef53159823cc7a4c7eb7221d1) using [vue-cli](https://github.com/vuejs/vue-cli). Documentation about the original structure can be found [here](https://simulatedgreg.gitbooks.io/electron-vue/content/index.html).
