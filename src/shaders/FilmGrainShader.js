// Film grain shader for dreamy, cinematic feel
export const FilmGrainShader = {
    uniforms: {
        tDiffuse: { value: null },
        time: { value: 0.0 },
        intensity: { value: 0.15 },
        vignette: { value: 0.6 },
        vignetteSize: { value: 0.5 }
    },

    vertexShader: `
        varying vec2 vUv;
        
        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,

    fragmentShader: `
        uniform sampler2D tDiffuse;
        uniform float time;
        uniform float intensity;
        uniform float vignette;
        uniform float vignetteSize;
        varying vec2 vUv;
        
        // Noise function for film grain
        float random(vec2 co) {
            return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
        }
        
        void main() {
            vec4 color = texture2D(tDiffuse, vUv);
            
            // Film grain
            float grain = random(vUv * time) * 2.0 - 1.0;
            color.rgb += grain * intensity;
            
            // Vignette
            vec2 center = vUv - 0.5;
            float dist = length(center);
            float vig = smoothstep(vignetteSize, vignetteSize - 0.5, dist);
            color.rgb *= mix(1.0 - vignette, 1.0, vig);
            
            // Slight color warmth
            color.r *= 1.02;
            color.b *= 0.98;
            
            gl_FragColor = color;
        }
    `
};
