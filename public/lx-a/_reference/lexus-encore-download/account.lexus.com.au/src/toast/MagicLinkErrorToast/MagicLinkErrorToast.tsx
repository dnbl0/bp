import * as React from "react";
import Toast from "../../components/Toast/Toast";
import NonRecoverableErrorCard from "../../components/errorCards/NonRecoverableErrorCard/NonRecoverableErrorCard";
import { magicLinkBasicUserInfoErrorSelector } from "ReduxSlices/user";

const MagicLinkErrorToast: React.FC = () => (
    <Toast>
        <NonRecoverableErrorCard errorSelector={magicLinkBasicUserInfoErrorSelector} />
    </Toast>
);

export default MagicLinkErrorToast;
