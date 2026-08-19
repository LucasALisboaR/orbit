package br.com.orbit.user.application.forgetPassword;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.orbit.user.application.dto.ForgotPasswordRequest;
import br.com.orbit.user.application.dto.MessageResponse;
import br.com.orbit.user.domain.UserRepository;

/**
 * Camada: APPLICATION (caso de uso — implementação)
 *
 * V0 didática: apenas confirma o fluxo.
 * Em produção: gerar token, salvar, enviar e-mail, depois trocar senha com changePassword().
 *
 * Sempre retorna a mesma mensagem para não vazar se o email está cadastrado.
 */
@Service
public class ForgotPasswordService implements ForgotPasswordUseCase {

    private static final String GENERIC_MESSAGE =
            "Se o email estiver cadastrado, enviaremos instruções para redefinir a senha.";

    private final UserRepository userRepository;

    public ForgotPasswordService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public MessageResponse execute(ForgotPasswordRequest request) {
        String email = request.email().trim().toLowerCase();
        // Preparado para o próximo passo (token/e-mail). Por enquanto só consulta.
        userRepository.findByEmail(email);
        return new MessageResponse(GENERIC_MESSAGE);
    }
}
