# Crea sitios web estáticos con Yarn y Gulp

Este es un flujo de trabajo sencillo para la creación de sitios web estáticos mediante el uso de Yarn como manejador de dependencias y Gulp como automatizador de tareas.

## Características de este flujo de trabajo:

* Puedes iniciar tu proyecto con npm (de [**Node**](https://nodejs.org/es/)) o [**Yarn**](https://yarnpkg.com/).
* Usa [**Gulp**](https://gulpjs.com/) en su version 4 para automatizar tareas.

## Consideraciones previas

* Tener nociones básicas del uso de la terminal/línea de comandos y utilizarla para la gestión del pryecto
* Debes tener instalado Node, lo puedes descargar desde [aquí](https://nodejs.org/es/). Para verificar la instalación, ejecuta:  
  `node --version`
* Verifica que cuentas con npm, para ello ejecuta lo siguiente:  
  `npm --version`
* Si ya tenias la version previa de Gulp, debes desinstalarla con el siguiente comando:  
	`npm rm --global gulp`
* Si ya desinstalaste Gulp o no lo tenias instalado, ejecuta el siguiente comando:  
	`npm i --global gulp-cli`
* Este proyecto utiliza el plugin `gulp-imagemin` pero la version `7.0.0` de forma específica, ya que con versiones posteriores se pueden generar errores, ***NO*** se recomienda utilizar versiones posteriores a la `7.0.0`

## Modo de uso

1. Clona este repositorio o descarga el archivo comprimido.
2. Puedes iniciar tu proyecto desde cero optando por el manejador de dependencias de tu preferencia, ya sea Yarn o npm.
3. Para instalar las dependencias necesarias (que ya vienen por defecto en el archivo *package.json*), debes asegurarte que en la terminal, estes posicionado en la carpeta de tu proyecto:
   * Si utilizaras npm, basta con ejecutar lo siguiente:  
	`npm install`
   * Si te decides por usar Yarn, simplemente ejecuta lo siguiente:  
   `yarn`
4. Verifica que tengas de forma global el `gulp-cli` y de forma local a `gulp`, para lo que debes ejecutar lo siguiente:  
   `gulp --version`  
	 lo que debe darte como resultado algo cómo esto:  
	 ```powershell
	 CLI version: 2.3.0
	 Local version: 4.0.2
	 ```
5. Debes observar que en el directorio de tu proyecto, se creó la carpeta `node_modules`, donde se instalaron todas las dependencias necesarias para que este flujo de trabajo funcione correctamente

## Estructura

1. La carpeta `src` contiene la estructura de archivos con la que se trabajará, considera que se hace uso de [**Pug**](https://pugjs.org/api/getting-started.html) como motor de platillas para generar el HTML final, [**SASS**](https://sass-lang.com/) como *preprocesador* de estilos y [**JavaScript**](https://developer.mozilla.org/es/docs/Web/JavaScript) para la parte dinámica que desees agregar.
2. La carpeta `css` dentro de `src`, contiene un archivo con una librería muy sencilla para el uso de flex box para el layout.
3. Puedes realizar pruebas antes de realizar los ajustes propios de tu proyecto.

Siéntete libre de usarlo y hacer sugerencias o reportar cualquier problema que encuentres.
