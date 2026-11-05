import { useEffect } from "react";
import { usePage } from "@inertiajs/react";
import Swal from "sweetalert2";

/** Success and error messages, and delete confirmations, in one SweetAlert2 look. */

const toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3500,
  timerProgressBar: true,
});

export const sucesso = (mensagem: string) => toast.fire({ icon: "success", title: mensagem });

/** Errors stay on screen until closed: the user has to read what went wrong. */
export const erro = (mensagem: string, titulo = "Não foi possível concluir") =>
  Swal.fire({ icon: "error", title: titulo, text: mensagem, confirmButtonText: "Entendi" });

export const aviso = (mensagem: string, titulo = "Atenção") =>
  Swal.fire({ icon: "warning", title: titulo, text: mensagem, confirmButtonText: "Entendi" });

/** Resolves true only when the user confirms. */
export const confirmarExclusao = async (titulo: string, texto: string): Promise<boolean> => {
  const resposta = await Swal.fire({
    icon: "warning",
    title: titulo,
    text: texto,
    showCancelButton: true,
    confirmButtonText: "Excluir",
    cancelButtonText: "Voltar",
    confirmButtonColor: "#d63939",
    focusCancel: true,
    reverseButtons: true,
  });

  return resposta.isConfirmed;
};

/** Shows the one-shot flash messages the server attached to the last response. */
export const useFlashAlert = () => {
  const { flash }: any = usePage().props;

  useEffect(() => {
    if (flash?.success) sucesso(flash.success);
    if (flash?.warning) aviso(flash.warning);
    if (flash?.error) erro(flash.error);
  }, [flash]);
};

/** Summary of a failed validation, for the inertia `onError` callback. */
export const avisarCamposInvalidos = (errors: Record<string, string>) => {
  const primeira = Object.values(errors)[0];
  aviso(primeira ? String(primeira) : "Confira os campos destacados.", "Confira os dados");
};

/** Inertia `onError` of the "consult pending" action: the server answers with flash, this covers validation. */
export const falhaAoConsultar = () => erro("Não foi possível consultar as notas agora. Tente de novo em instantes.");
