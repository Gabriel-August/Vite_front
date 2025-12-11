package com.example.reservationsystem.service;

import com.example.reservationsystem.model.Reservation;
import com.example.reservationsystem.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ReservationService {

    @Autowired
    private ReservationRepository reservationRepository;

    public Reservation createReservation(Reservation reservation) {
        List<Reservation> overlappingReservations = reservationRepository.findOverlappingReservations(
                reservation.getRoom().getId(),
                reservation.getStartTime(),
                reservation.getEndTime()
        );

        if (!overlappingReservations.isEmpty()) {
            throw new RuntimeException("Room already booked for the selected time");
        }

        return reservationRepository.save(reservation);
    }
}
