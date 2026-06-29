/* eslint-disable comma-dangle */
import * as React from "react";
import "./DeleteCardConfirmationCard.scss";
import ErrorCard from "../../../../errorCards/ErrorCard/ErrorCard";
import ErrorCardButton from "../../../../errorCards/ErrorCard/ErrorCardButton/ErrorCardButton";
import { ButtonStyle, ButtonShade } from "lexus-style-guide/buttons/shared";

interface Prop {
    onSave: () => void;
    onCancel: () => void;
}

const DeleteCardConfirmationCard: React.FC<Prop> = ({ onSave, onCancel }) => {
    return (
        <ErrorCard title={"delete this card?"} className={"is-bg-type-light"}>
            <ErrorCardButton onClick={onSave} buttonStyle={ButtonStyle.Primary}>
                Yes
            </ErrorCardButton>
            <ErrorCardButton onClick={onCancel} buttonStyle={ButtonStyle.Secondary} shade={ButtonShade.Light}>
                No, Close
            </ErrorCardButton>
        </ErrorCard>
    );
};

export default DeleteCardConfirmationCard;
