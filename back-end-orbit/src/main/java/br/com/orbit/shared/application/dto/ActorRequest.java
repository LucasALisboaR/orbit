package br.com.orbit.shared.application.dto;

import java.util.UUID;

/**
 * Quem está autenticado na requisição (id do JWT + se é ADMIN).
 */
public record ActorRequest(UUID id, boolean admin) {
}
