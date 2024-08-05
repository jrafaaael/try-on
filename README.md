# Try on!
`Try on` es un proyecto que permite a las personas probar prendas de ropa antes de comprarlas en su e-commerce preferido!

Con esta extensión de Chrome, los usuarios pueden cargar una imagen de una persona (modelo) y una prenda de ropa (garment). Gracias al modelo [`IDM-VTON`](https://github.com/yisol/IDM-VTON), podemos generar una nueva imagen del modelo con esta nueva prenda de ropa!

## Correr localmente

1. Clonar el repositorio
```bash
git clone git@github.com:jrafaaael/try-on.git
```

2. Instalar las dependencias
```bash
cd try-on/
pnpm i
```

3. Levantar el backend
```bash
pnpm api:dev
```

4. Levantar el frontend (en una terminal diferente a la del backend)
> [!IMPORTANT]  
> La extensión fue desarrollada con Vite. Por ello, el desarrollo se lleva a cabo como un proyecto web normal. Para probar el funcionamiento como extensión, dirigete a [¿Cómo probar la extensión?](#faq)
```bash
pnpm ext:dev
```

## FAQ

<details>
  <summary>¿Cómo probar la extensión?</summary>

  La extensión fue desarrollada con Vite. Por ello, el desarrollo se lleva a cabo como un proyecto web normal. Una vez se quiera probar el funcionamiento como extensión se deben seguir los siguientes pasos:

  1. Realizar el proceso de build
  ```bash
  pnpm ext:build
  ```

  2. Sigue los pasos de la [documentación de desarrolladores de Chrome](https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world#load-unpacked) con la carpeta `dist` generada en el directorio `extension`
</details>

<br />

<details>
  <summary>¿Por qué solo están permitidas las prendas de la parte superior del cuerpo?</summary>

  El modelo de inteligencia artificial `IDM-VTON` tiene la capacidad de generar imagenes con prendas tanto de la parte superior como de la parte inferior del cuerpo. Sin embargo, la versión existente en [Huggingface](https://huggingface.co/spaces/yisol/IDM-VTON) (donde está alojado dicho modelo de IA para su uso de forma gratuita) solo fue entrenado para realizar cambios de ropa en la parte superior del modelo (persona)

  Una posible solución podría ser o bien intentar crear un nuevo Space en Huggingface con la versión más actualizada del modelo de IA o utilizar la versión de pago alojada en [Replicate](https://replicate.com/cuuupid/idm-vton) (no ad)
</details>

<br />

<details>
  <summary>¿Cómo usa este proyecto el AI SDK de Vercel?</summary>

  Las validaciones de las imágenes es gracias a [AI SDK de Vercel](https://sdk.vercel.ai/) y al modelo de Google, Gemini!
</details>