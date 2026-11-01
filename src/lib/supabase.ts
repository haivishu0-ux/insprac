import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Practical, PRACTICALS_DATA } from '../data/practicalsData';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl !== 'https://your-project.supabase.co' &&
  !supabaseUrl.includes('example.com')
);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : null;

export async function fetchPracticals(): Promise<{
  data: Practical[];
  fromSupabase: boolean;
  error: string | null;
}> {
  if (!isSupabaseConfigured || !supabase) {
    return {
      data: PRACTICALS_DATA,
      fromSupabase: false,
      error: null
    };
  }

  try {
    const { data, error } = await supabase
      .from('practicals')
      .select('*')
      .order('practical_number', { ascending: true });

    if (error) {
      console.warn('Supabase query returned error, falling back to local dataset:', error.message);
      return {
        data: PRACTICALS_DATA,
        fromSupabase: false,
        error: error.message
      };
    }

    if (!data || data.length === 0) {
      console.info('Supabase practicals table is currently empty, using standard curriculum data.');
      return {
        data: PRACTICALS_DATA,
        fromSupabase: false,
        error: null
      };
    }

    // Map database fields safely and retain parts structure
    const formattedData: Practical[] = data.map((item) => {
      const fallbackItem = PRACTICALS_DATA.find(
        (p) => p.practical_number === item.practical_number || p.practical_code === item.practical_code
      );

      return {
        id: String(item.id ?? item.practical_code ?? ''),
        practical_number: Number(item.practical_number ?? 0),
        practical_code: String(item.practical_code ?? `P${String(item.practical_number).padStart(2, '0')}`),
        title: String(item.title ?? fallbackItem?.title ?? ''),
        description: String(item.description ?? fallbackItem?.description ?? ''),
        language: String(item.language ?? fallbackItem?.language ?? 'python'),
        install_command: item.install_command ?? fallbackItem?.install_command,
        install_label: item.install_label ?? fallbackItem?.install_label,
        parts: item.parts && Array.isArray(item.parts) && item.parts.length > 0 ? item.parts : (fallbackItem?.parts ?? []),
        code_content: String(item.code_content ?? fallbackItem?.code_content ?? ''),
        copyable: item.copyable !== false,
        created_at: item.created_at,
        updated_at: item.updated_at
      };
    });

    return {
      data: formattedData,
      fromSupabase: true,
      error: null
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown database error';
    console.warn('Supabase connection failure, serving fallback:', message);
    return {
      data: PRACTICALS_DATA,
      fromSupabase: false,
      error: message
    };
  }
}

/**
 * Robust HTTPS / iFrame-safe clipboard copy function
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  if (!text) return false;

  // Primary modern Clipboard API
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      console.warn('Navigator clipboard API failed, trying execCommand fallback:', err);
    }
  }

  // Fallback for restricted iframe or older environments
  try {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    textArea.style.pointerEvents = 'none';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    return successful;
  } catch (err) {
    console.error('All clipboard operations failed:', err);
    return false;
  }
}
