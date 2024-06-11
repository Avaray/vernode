declare module 'vernode' {
  interface Versions {
    lts?: string;
    current?: string;
    nightly?: string;
  }

  export default function all(): Promise<Versions>;

  export function lts(): Promise<string | undefined>;
  export function nightly(): Promise<string | undefined>;
  export function current(): Promise<string | undefined>;
}
